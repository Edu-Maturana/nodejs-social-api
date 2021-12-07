const { request, response } = require("express");

const Post = require("../models/post");

const createPost = async (req, res) => {
    const {text} = req.body;

    const post = new Post({
        text,
        user: req.user._id,
    });

    // save post
    await post.save();

    res.json({
        message: "Post created successfully",
        post
    });
}

const readPosts = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, posts] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query).sort({createdAt: -1}).skip(Number(from)).limit(Number(limit))
            .populate("user", "name")
    ]);

    res.json({
        total,
        posts
    });
}

const readPost = async (req, res) => {
    const {id} = req.params;
    const query = {_id: id, state: true};

    const post = await Post.findOne(query).populate("user", "name avatar");

    res.json({
        post
    });
}

const updatePost = async (req, res) => {
    const {id} = req.params;
    const {content, ...rest} = req.body;

    const query = {_id: id, state: true};

    const post = await Post.findOneAndUpdate(query, {content}, {new: true});

    res.json({
        message: "Post updated successfully",
        post
    });
}

const deletePost = async (req, res) => {
    const {id} = req.params;
    const query = {_id: id, state: true};

    const post = await Post.findOneAndUpdate(query, {state: false}, {new: true});

    res.json({
        message: "Post deleted successfully",
        post
    });
}

module.exports = {
    createPost,
    readPosts,
    readPost,
    updatePost,
    deletePost
}