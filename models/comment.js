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
});

module.exports = model('Comment', CommentSchema);
