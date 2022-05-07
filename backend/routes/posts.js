const router = require('express').Router();
const Post = require('../model/Post');

router.post("/addPost", async (req, res) => {
    try{
        console.log("Inside add post");
        console.log(req.body);
        const post = await new Post({
            userId: req.body.userId,
            email:req.body.email,
            name:req.body.name,
            text:req.body.text,
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



module.exports = router;