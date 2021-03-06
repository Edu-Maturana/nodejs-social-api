const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const readUsers = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        users,
        total
    });
}

const readUser = async (req, res = response) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        });
    }

    res.json({
        ok: true,
        user
    });
}

const createUser = async (req, res = response) => {
    const {name, email, password, role } = req.body;
    const user = new User({name, email, password, role });

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();

    res.json({
        ok: true,
        user
    });
}

const updateUser = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, email, ...rest} = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, {new: true});

    res.json({
        ok: true,
        user
    });
}

module.exports = {
    readUsers,
    readUser,
    createUser,
    updateUser
}