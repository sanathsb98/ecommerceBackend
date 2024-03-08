const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsModal = new Schema({
    userid: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userprofilepic: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Posts',PostsModal)