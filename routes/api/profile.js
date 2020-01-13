const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const {
    myProfile,
    createProfile,
    getAllProfiles,
    getUserProfile,
    addEducation,
    deleteEducation,
    deleteExperience,
    addExperience
} = require("../../controlers/profile");

router.route("/me").get(auth, myProfile);
router.route("/").post(auth, createProfile).get(getAllProfiles);
router.route("/user/:user_id").get(getUserProfile);
router.route("/add-education").post(auth, addEducation);
router.route("/education/:id").delete(auth, deleteEducation);
router.route("/add-experience").post(auth, addExperience);
router.route("/experience/:id").delete(auth, deleteExperience);

module.exports = router;