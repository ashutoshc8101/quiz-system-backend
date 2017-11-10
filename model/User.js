const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    profile: {
        age: String,
        bio: String,
        points: Number,

    }
});

let User = mongoose.model('User', UserSchema);

module.exports = User;