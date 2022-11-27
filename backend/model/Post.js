const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postCreatorEmail: {
      type: String,
      max: 500,
      required: true,
    },
    postCreatorUserName: {
      type: String,
      required: true,
    },
    postTitle: {
        type: String,
    },
    postText: {
      type: String,
      default: "",
    },
    image: {
      type: Array,
      default: [],
    },
    upVotes: {
      type: Array,
      default: [],
    },
    downVotes: {
      type: Array,
      default: [],
    },
    communityId: {
      type: String,
    },
    communityName: {
        type: String,
        required:true
    },
    comments: {
        type: Array,
        default: []
    },
  
}, {timestamps : true} );

module.exports = mongoose.model("Post", PostSchema);
