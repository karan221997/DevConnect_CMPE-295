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
        await post.save();
        res.status(200).json({message:"Added Post Succesfully"});
    }
    catch(err){
        res.status(500).json({message: err});
    
    }
});

//all the post that will be on users dashboard - only the ones that he is part of that community
router.post("/getAllPost", async (req, res) => {
    try{
        console.log("Inside get post");
        console.log(req.body.email);
        //we will get following from frnt end 
        // const userDetails = await User.find({email:req.body.email});
        // console.log(userDetails.following[0]);

        // //working properly if user details is array [1,2,3]
        // const allPosts = await Post.find().where('communityId').in(userDetails).exec();
        // res.status(200).json(allPosts);

        const allPosts=await Post.find()
        res.status(200).json(allPosts);
        
    }
    catch(err){
        res.status(500).json({message: err});
    
    }
});

module.exports = router;