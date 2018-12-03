const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayname: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('user', UserSchema);