const {response} = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const defaultImage = require('../assets/default-image');

const User = require('../models/user');
const validExtensions = ['png', 'jpg', 'jpeg'];

const changeAvatar = async (req, res = response) => {
    const {id} = req.params;
    
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }
    
    const user = await User.findById(id);
    
    if (!user) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        });
    }
    
    // Verify if the user is the same that the one that is trying to change the avatar
    if (user.id !== req.user.id) {
        return res.status(401).json({
            ok: false,
            msg: 'User not authorized'
        });
    }
    
    if (user.avatar && user.avatar != defaultImage) {
        const nameArr = user.avatar.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        await cloudinary.uploader.destroy( public_id );
    }
    
    const {tempFilePath} = req.files.avatar;
    // Validate extension
    const extension = tempFilePath.split('.').pop();

    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid extension'
        });
    }

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    
    user.avatar = secure_url;
    
    await user.save();

    res.json({
        ok: true,
        msg: 'Avatar changed successfully',
        user
    });
}

module.exports = {
    changeAvatar
}