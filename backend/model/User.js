const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        min:3,
        max:20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max:50,
        unique: true
    },
    password: {
        type: String,
        min:8,
        max:20,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
     coverPicture: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },

    following: {
        type: Array,
        default: []
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    description : {
        type: String,
        max : 100,
        default: ""
    },
    location : {
        type: String,
        default: ""
    }
}, {timestamps: true} );

module.exports = mongoose.model("User", UserSchema);
