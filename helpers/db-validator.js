const {User, Post, Role} = require('../models');

const isValidRole = async (role) => {
    const exists = await Role.findOne({role});
    if (!exists) {
        throw new Error('Role does not exist');
    }
};

const emailExists = async (email) => {
    const exists = await User.findOne({email});
    if (exists) {
        throw new Error('Email already exists');
    }
}

const userExists = async (userId) => {
    const exists = await User.findById(userId);
    if (!exists) {
        throw new Error('User does not exist');
    }
}

const postExists = async (postId) => {
    const exists = await Post.findById(postId);
    if (!exists) {
        throw new Error('Post does not exist');
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExists,
    postExists
}

