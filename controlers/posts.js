const User = require("../models/User");
const Post = require("../models/Post");
const _ = require("lodash");

// @route GET api/posts/
// @desc  GET all posts
// @access Public

exports.getPosts = async (req, res) => {
    try {

        const posts = await Post.find();
        res.status(400).json(posts);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// @route POST api/posts
// @desc  Create a post
// @access Private

exports.posting = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        const newPost = new Post({
            user: req.user.id,
            avatar: user.avatar,
            name: user.name,
            text: req.body.text
        });

        const post = await newPost.save();
        res.status(200).json(post);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// @route DELETE api/posts
// @desc DELETE a Post
// @access Private

exports.deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.postid);

        if(post.user.toString() !== req.user.id) {
            res.status(401).json({message: "Not authorized"})
        }

        await post.remove();
        res.status(200).json({message: "Post was successfully deleted"})


    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

// @route POST api/posts/comments/:postid
// @desc  Create a comment
// @access Private

exports.postComment = async (req, res) => {
    try {

        const post = await Post.findById(req.params.postid);
        const user = await User.findById(req.user.id);


        const newComment = {
            id: req.user.id,
            text: req.body.text,
            avatar: user.avatar,
            name: user.name
        };

        post.comments.unshift(newComment);
        await post.save();

        res.status(200).json({message: "Post added successfully"})

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// @route POST api/posts/likes/:postid
// @desc  Post a like
// @access Private

exports.postLike = async (req, res) => {
    try {

        const post = await Post.findById(req.params.postid);
        const user = await User.findById(req.user.id);

        const allLikes = post.likes.map(post => {
            return post.user.toString();
        });


        if (_.includes(allLikes, req.user.id)) {
            return res.status(400).json({message: "The post has already been liked !"})
        }

        post.likes.unshift({user: req.user.id});
        await post.save();


        res.status(200).json({message: `Post with the id of ${post.id} was liked`});

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// @route POST api/posts/unlikes/:postid
// @desc  Post an unlike
// @access Private

exports.postUnlike = async (req, res) => {

    try {
        const post = await Post.findById(req.params.postid);

        const allLikes = _.map(post.likes, post => {
            return post.user.toString();
        });

        if (!_.includes(allLikes, req.user.id)) {
            return res.status(400).json({message: "This post hasn't been liked"})
        }

        if (_.includes(allLikes, req.user.id)) {
            post.likes.splice(req.user.id, 1)
        }

        await post.save();
        res.status(200).json({message: `Post with the id of ${post.id} was un-liked`});

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

