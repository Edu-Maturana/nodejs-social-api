const { response, request } = require("express");

const { Comment, Post } = require("../models");

const readCommentsByPost = async (req, res = response) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            ok: false,
            message: "Post not found",
        });
    }

    // Find all the comments from the post
    const comments = await Comment.find({ post: id }).populate("user", "name");

    // Send the comments as a response
    res.json({
        comments
    });
};

const createComment = async (req, res = response) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ msg: "Please add text" });
    }

    // Link comment to post
    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }

    const newComment = new Comment({
        text,
        post: id,
        user: req.user.id
    });

    
    // Save comment
    await newComment.save();
    
    // Add comment to post
    post.comments.push(newComment);
    await post.save();

    res.json({ msg: "Comment added" });
}

const updateComment = async (req, res = response) => {
    const user = req.user.id;
    const { text } = req.body;
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Check if the user is the owner of the comment
        if (comment.user.toString() !== user) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        comment.text = text;

        await comment.save();

        res.json({ comment });
    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
    }
}

const deleteComment = async (req, res = response) => {
    const user = req.user.id;
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Check if the user is the owner of the comment
        if (comment.user.toString() !== user) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await comment.remove();

        res.json({ msg: "Comment deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error");
    }
}

module.exports = {
    readCommentsByPost,
    createComment,
    updateComment,
    deleteComment
}