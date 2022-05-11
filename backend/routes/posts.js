const router = require('express').Router();
const Post = require('../model/Post');
const User = require('../model/User');

router.post("/addPost", async (req, res) => {
    try{
        console.log("Inside add post");
        console.log(req.body);
        const post = await new Post({
            userId: req.body.userId,
            postCreatorEmail:req.body.email,
            postCreatorUserName:req.body.userName,
            postTitle:req.body.title,
            postText:req.body.text,
            image:req.body.image,
            upVotes:req.body.upVotes,
            downVotes:req.body.downVotes,
            communityId:req.body.communityId,
            communityName:req.body.communityName
        })
        const savedPost =await post.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json({message: err});
    
    }
});

//all the post that will be on users dashboard - only the ones that he is part of that community
router.post("/getAllPost", async (req, res) => {
    try{
        console.log("Inside get all post");
        console.log(req.body);
        const posts = await Post.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);
        res.status(200).json({posts});
    }
    catch(err){
        res.status(500).json({message: err});
    }
});
module.exports = router;