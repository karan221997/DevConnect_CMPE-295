const router = require("express").Router();
const Community = require("../model/Community");
const User = require("../model/User");
const Post = require("../model/Post");

router.post("/createCommunity", async (req, res) => {
  try {
    console.log(req.body);

    const existing = await Community.findOne({
      communityName: req.body.communityName,
    });
    if (existing) {
      res.status(500).json({ message: "Community Already Exists" });
    } else {
      const newCommunity = await new Community({
        communityId: req.body.communityId,
        communityName: req.body.communityName,
        communityDescription: req.body.communityDescription,
        communityRules: req.body.communityRules,
        communityImage: req.body.communityImage,
        creationTime: req.body.creationTime,
        createdBy: req.body.createdBy,
        communityMembers: [req.body.createdBy],
      });
      const result = await newCommunity.save();
      if (result) {
        const success1 = await User.findOneAndUpdate(
          { email: req.body.createdBy },
          { $push: { followers: req.body.communityName } }
        );
        if (success) {
          res.status(200).json(result);
        }
      }
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

router.post("/getAllCommunities", async (req, res) => {
  let paginatedResult = [];
  const results = {};
  let i;
  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const len = await Community.countDocuments().exec();
  console.log(len);

  if (endIndex < len) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    const result = await Community.find(
      {},
      {
        communityName: 1,
        communityDescription: 1,
        createdBy: 1,
        numberOfMembers: 1,
        numberOfPosts: 1,
        communityMembers: 1,
        communityImage: 1,
      }
    );
    if (result) {
      paginatedResult = result.slice(startIndex, endIndex);
      res.status(200).json(paginatedResult);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/joinCommunity", async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.communityId);
  try {
    communityMembers = await Community.find(
      { communityName: req.body.communityName },
      { communityMembers: 1 }
    );
    let members = communityMembers[0].communityMembers;
    if (members.includes(req.body.email)) {
      res.status(409).json({ message: "User is already part of Community" });
    } else {
      console.log("idhar 1");
      const check1 = await Community.findOneAndUpdate(
        { communityName: req.body.communityName },
        {
          $push: {
            communityMembers: req.body.email,
          },
          $inc: { numberOfMembers: +1 },
        }
      );
      console.log("check 1 complete");
      const check2 = await User.findOneAndUpdate(
        { email: req.body.email },
        { $push: { followers: req.body.communityName } }
      );
      console.log("check2 complete");

      if (check1 && check2) {
        res.status(200).json({ message: "Successfully joined Community" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

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

//get all communities for create post list
router.get("/getAllCommunities", async (req, res) => {
  try {
    const result = await Community.find(
      {},
      { communityName: 1}
    );
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;
