const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
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

var User = mongoose.model('User', UserSchema);

module.exports = User;