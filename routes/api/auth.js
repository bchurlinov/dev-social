const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const {register, login, getUser, editUser, deleteUser} = require("../../controlers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getuser").get(auth, getUser);
router.route("/edituser").post(auth, editUser);
router.route("/delete-user").delete(auth, deleteUser);

module.exports = router;