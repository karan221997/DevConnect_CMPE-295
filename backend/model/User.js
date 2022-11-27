const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        max: 20,
        min: 3
    },
    phoneNumber: {
        type: String,
        max: 20
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        max: 20,
        required: true
    },
    profilePicture: {
        type: String,
        default: "/assets/person/defaultProfilePiture.jpg"
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
//group the user is following
    following: {
        type: Array,
        default: []
    },

    isAdmin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        max: 100,
        default: ""
    },
    location: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
