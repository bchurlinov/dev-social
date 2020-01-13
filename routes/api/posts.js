const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const {posting, postComment, getPosts, postLike, postUnlike, deletePost} = require("../../controlers/posts");

router.route("/").post(auth, posting).get(getPosts);
router.route("/comments/:postid").post(auth, postComment);
router.route("/likes/:postid").post(auth, postLike);
router.route("/unlikes/:postid").post(auth, postUnlike);
router.route("/delete/:postid").delete(auth, deletePost);

module.exports = router;