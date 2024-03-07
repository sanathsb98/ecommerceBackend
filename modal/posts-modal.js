const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsModal = new Schema({
    userid: {
        type: String,
        required: true,
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