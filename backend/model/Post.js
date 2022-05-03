const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    desc:   {
        type: String,
        max : 500,
        default: ""

    },
    image: {
        type: String,
        default: ""
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
  
}, {timestamp : true} );

module.exports = mongoose.model("Post", PostSchema);
