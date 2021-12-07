const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Comment', CommentSchema);
