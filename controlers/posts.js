const User = require("../models/User");
const Post = require("../models/Post");
const _ = require("lodash");

// @route GET api/posts/
// @desc  GET all posts
// @access Public

exports.getPosts = async (req, res) => {
    try {

        let query;

        if (req.query.page) {

            const page = parseInt(req.query.page, 10) || 1; //for next page pass 1 here
            const limit = parseInt(req.query.limit, 10) || 4;
            const skip = (page -1) * limit;

            const countLength = await Post.find();
            query = await Post.find().skip(skip).limit(limit).sort({date: -1});

            res.status(200).json({data: query, page: page, count: countLength.length});

        } else {
            query = await Post.find().sort({date: -1});
            res.status(200).json(query);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

exports.getSinglePost = async (req, res) => {
    try {

        const post = await Post.findOne({_id: req.params.postid});

        if (!post) {
            return res.status(404).json({message: "No post found"})
        }

        res.status(200).send(post);

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

// @route DELETE api/posts/delete/:postid
// @desc DELETE a Post
// @access Private

exports.deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.postid);

        if (post.user.toString() !== req.user.id) {
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
        const user = await User.findById(req.user.id).select("-password");

        const userLiked = {
            user: user._id,
            avatar: user.avatar,
            name: user.name
        };

        const allLikes = post.likes.map(post => {
            return post.user.toString();
        });


        if (_.includes(allLikes, req.user.id)) {
            return res.status(400).json({message: "The post has already been liked !"})
        }

        post.likes.unshift(userLiked);
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

