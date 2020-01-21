const Profile = require("../models/Profile");
const _ = require("lodash");

// @route GET api/profile
// @desc Get all profiles
// @access Public

exports.getAllProfiles = async (req, res) => {
    try {

        let requestQuery;
        let requestParams = {...req.query};
        let disabled = ["status", "skills", "location"];

        _.map(disabled, (item) => {
            if (!req.query[item]) {
                requestQuery = delete requestParams[item]
            }
        });

        const popQuery = [{path: "user", select: "name avatar"}, {path: "topics"}];
        requestQuery = await Profile.find(requestParams).populate(popQuery).sort({date: -1});

        res.json(requestQuery);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// @route GET api/profile/user/:user_id
// @desc GET ProfileCard by user id
// @access Public

exports.getUserProfile = async (req, res) => {
    try {

        const popQuery = [{path: "user", select: "name avatar"}, {path: "topics"}];
        const userProfile = await Profile.find({user: req.params.user_id}).populate(popQuery);

        if (!userProfile) {
            res.status(400).json({msg: "There is no profile for this user"})
        }

        res.json(userProfile);

    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId") {
            return res.status(400).json({message: "There is no profile for this user"});
        }

        res.status(500).send("Server Error")
    }
};


// @route GET api/profile/me
// @desc GET current user profile
// @access Private

exports.myProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user");
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// @route POST api/profile
// @desc Create or update user profile
// @access Private

exports.createProfile = async (req, res) => {

    const {
        website,
        location,
        bio,
        status,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
        github
    } = req.body;

    let profileFields = {};
    profileFields.user = req.user.id;

    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (github) profileFields.social.github = github;

    try {

        const profile = await Profile.findOne({user: req.user.id});

        if (profile) {

            const updateProfileFields = {...profile.social, ...profileFields.social}
            const updateProfile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            const socialUpdate = await Profile.findOneAndUpdate({user: req.user.id}, {$set: {social: updateProfileFields}});
            res.status(200).send(updateProfile);

        } else {

            const newProfile = new Profile(profileFields);
            await newProfile.save();
            res.status(200).send(newProfile);
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// @route POST api/profile/add-education
// @desc Add profile education
// @access Private

exports.addEducation = async (req, res) => {
    try {

        const {school, degree, fieldofstudy, from, to, description, current} = req.body;

        const profile = await Profile.findOne({user: req.user.id});
        let currentEducation = profile.education;

        let updateEducation = {};
        if (school) updateEducation.school = school;
        if (degree) updateEducation.degree = degree;
        if (fieldofstudy) updateEducation.fieldofstudy = fieldofstudy;
        if (from) updateEducation.from = from;
        if (to) updateEducation.to = to;
        if (description) updateEducation.description = description;
        if (current) updateEducation.current = current;

        currentEducation.unshift(updateEducation);

        if (profile) {
            const updatedProfile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: {education: currentEducation}}, {new: true});
            res.status(200).json({message: "Profile updated successfully"});
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// @route DELETE api/profile/education/:id
// @desc DELETE Profile Education
// @access Private

exports.deleteEducation = async (req, res) => {
    try {

        const profile = await Profile.findOne({user: req.user.id});
        const checkExist = !!_.find(profile.education, {id: req.params.id});

        if (checkExist) {
            const removeIndex = profile.education.map(edu => edu._id).indexOf(req.params.id);
            profile.education.splice(removeIndex, 1);

            const deleteEducation = await profile.save();
            res.status(200).json({message: "Education successfully deleted !"})
        } else {
            res.status(400).json({message: "Education does not exist !"})
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// @route DELETE api/profile/experience/:id
// @desc DELETE Profile Experience
// @access Private

exports.deleteExperience = async (req, res) => {
    try {

        const profile = await Profile.findOne({user: req.user.id});
        const findExperience = !!_.find(profile.experience, {id: req.params.id});

        if (findExperience) {

            const removeIndex = _.map(profile.experience, exp => exp.id).indexOf(req.params.id);
            profile.experience.splice(removeIndex, 1);
            await profile.save();

            res.status(200).json({message: "Experience successfully deleted !"})
        } else {
            res.status(400).json({message: "Experience does not exist !"})
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// @route POST api/profile/add-experience
// @desc Add experience
// @access Private

exports.addExperience = async (req, res) => {
    try {

        const profile = await Profile.findOne({user: req.user.id});

        if (!profile) {
            res.status(200).json({message: "This profile does not exist"})
        }

        const {position, company, location, from, to, description, current} = req.body;
        let currentExperience = profile.experience;

        const experience = {
            position,
            company,
            location,
            from,
            to,
            description,
            current
        };

        currentExperience.unshift(experience);

        const addExperience = await Profile.findOneAndUpdate({user: req.user.id}, {$set: {experience: currentExperience}}, {new: true});
        res.status(200).send(addExperience)

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
};

// TEST TEST
// GET api/profile/expired
// exports.getExpired = async (req, res) => {
//     try {
//         let profile = await Profile.find();
//
//         const updatedItems = [];
//         const checkDates = _.map(profile, (item) => {
//
//             console.log(moment().diff(moment(item.date), "days"));
//             if (moment().diff(moment(item.date), "days") <= 2) {
//                 updatedItems.push(item);
//             }
//         });
//
//
//         if (updatedItems.length === 0) {
//             res.status(404).json({message: "No profile found"})
//         }
//
//         res.status(200).json({
//             count: updatedItems.length,
//             message: "Profiles matching your criteria are returned",
//             profiles: updatedItems
//         });
//
//
//     } catch (err) {
//
//     }
// };



