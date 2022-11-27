const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  communityName: {
    type: String,
    required: true,
  },
  communityDescription: {
    type: String,
    required: true,
  },
  communityRules: {
    type: Array,
  },
  communityImage: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNx91RRKTVtSj9ZAq7rNTlJHUqmGqcbVgIiA&usqp=CAU",
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  communityMembers: {
    type: Array,
  },
  numberOfMembers: {
    type: Number,
    default: 1,
  },
  numberOfPosts: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Community", communitySchema);
