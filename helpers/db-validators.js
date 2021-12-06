const {User, Post, Role} = require('../models');

const isValidRole = async (role = "USER") => {
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

const userExistsByName = async (name) => {
    const exists = await User.findOne({name});
    if (exists) {
        throw new Error('User name already exists');
    }
}

const userExists = async (id) => {
    const exists = await User.findById(id);
    if (!exists) {
        throw new Error('User does not exist');
    }
}

const postExists = async (id) => {
    const exists = await Post.findById(id);
    if (!exists) {
        throw new Error('Post does not exist');
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userExists,
    postExists,
    userExistsByName
}

