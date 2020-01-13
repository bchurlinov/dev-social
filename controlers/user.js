const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// User Model
const User = require("../models/User");
const Profile = require("../models/Profile");

// @route     POST api/auth/register
// @desc      Register User
// @access    Public

exports.register = async (req, res) => {
    try {

        const {name, email, password} = req.body;

        let user = await User.findOne({email: email});

        if (user) {
            res.status(400).json({message: "User already exist"})
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id
            }
        };

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 36000000
        }, (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    } catch (err) {
        res.status(400).json({success: false, message: err});
    }
};

// @route     POST api/auth/login
// @desc      Login User
// @access    Public

exports.login = async (req, res) => {

    try {

        const {email, password} = req.body;

        let user = await User.findOne({email: email});

        if (!user) {
            res.status(400).json({message: "Invalid Credentials"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            res.status(400).json({message: "Your password / e-mail do not match our records"})
        } else {

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({token});
            });
        }

    } catch (err) {
        res.status(500).send("Server Error")
    }
};

// @route     GET api/auth/getuser
// @desc      GET User
// @access    Private

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.status(200).send(user);
        }

    } catch (err) {
        res.status(500).send("Server Error")
    }
};

// @route     POST api/auth/edituser
// @desc      POST Edit User
// @access    Private

exports.editUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            await User.findOneAndUpdate(
                {_id: req.user.id},
                {$set: {profile: true}},
                {new: true}
            );

            res.status(200).json({message: "user updated"})
        }

    } catch (err) {
        res.status(500).send("Server Error")
    }
};

// @route     DELETE api/auth/delete-user
// @desc      Delete User
// @access    Private

exports.deleteUser = async (req, res) => {
    try {

        const profile = await Profile.findOne({user: req.user.id});
        const user = await User.findOne({_id: req.user.id});

        if (profile && user) {
            await profile.deleteOne({user: req.user.id});
            await user.deleteOne({_id: req.user.id});

            res.status(200).json({message: "User deleted successfully"})
        } else {
            res.status(404).json({message: "User not found"});
        }


    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
};




