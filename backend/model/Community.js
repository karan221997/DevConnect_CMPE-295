const mongoose = require("mongoose");


const communitySchema = new mongoose.Schema({
  communityId: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
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
    required: true,
  },
  communityImage: {
    type: String,
    default:
      "https://www.china-admissions.com/wp-content/uploads/2021/06/Divi-Community-Update-May-2020-scaled-1.jpeg",
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
