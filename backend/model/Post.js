const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    postCreatorEmail:   {
        type: String,
        max : 500,
        required: true

    },
    postCreatorUserName: {
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    communityId: {
        type: String,
        required:true
    },
    communityName: {
        type: String,
        required:true
    }
  
}, {timestamp : true} );

module.exports = mongoose.model("Post", PostSchema);
