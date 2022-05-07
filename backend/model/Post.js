const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    email:   {
        type: String,
        max : 500,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    text: {
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
