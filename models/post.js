const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    }

});

PostSchema.methods.toJSON = function() {
    const { __v, comments, ...post} = this.toObject();
    return post;
}

module.exports = model('Post', PostSchema);