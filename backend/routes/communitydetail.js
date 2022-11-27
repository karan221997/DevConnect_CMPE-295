const router = require("express").Router();
const Community = require("../model/Community");
const User = require("../model/User");
const Post = require("../model/Post");

router.post("/getAllPostInCommunity", async (req, res) => {
  try {
    const communityName = req.body.communityName;
    console.log("param", communityName);
    const result = await Post.find({ communityName: communityName });
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/getCommunities/:user_email", async (req, res) => {
  try {
    const userEmail = req.params.user_email;
    const result = await User.find({ email: userEmail }, { followers: 1 });
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/getCommunityDetail/:community_id", async (req, res) => {
  try {
    const communityId = req.params.community_id;
    const result = await Community.find(
      { _id: communityId },
      { communityName: 1 }
    );
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
