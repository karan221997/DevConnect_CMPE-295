const router = require('express').Router();
const Conversation = require('../model/Conversation');

//new conversation
router.post("/", async (req, res) => {
  console.log("new convo");
    console.log(req.body.senderId);
    console.log(req.body.receiverId);
    // const newConversation = new Conversation({
    //     members: [req.body.senderId, req.body.receiverId],
    // });
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
    console.log(newConversation);

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }

})




//get conversation of user
router.get("/:userId", async (req, res) => {
  console.log("getting conversations");
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // get conv includes two userId
  router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    console.log("in 2 users convo api")
    console.log(req.params.firstUserId);
    console.log(req.params.secondUserId);
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;