const router = require('express').Router();
const Post = require('../model/Post');
const User = require('../model/User');
const upload = require("../services/ImageUpload");

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
            communityName:req.body.communityName,
            image: req.body.S3URL
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


//upvote a post
router.post("/upVote", async (req, res) => {
    try{
        console.log("Inside upvote");
        console.log(req.body);
        const post = await Post.findOneAndUpdate({_id:req.body.postId},{$inc:{upVotes:1}});
        res.status(200).json({post});
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//downvote a post
router.post("/downVote", async (req, res) => {
    try{
        console.log("Inside downvote");
        console.log(req.body);
        const post = await Post.findOneAndUpdate({_id:req.body.postId},{$inc:{downVotes:1}});
        res.status(200).json({post});
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

//comment on a post
router.post("/comment", async (req, res) => {
    try{
        console.log(req.body);
        const post = await Post.findOne
        ({
            _id:req.body.postId
        });
        console.log(post);
        post.comments.push({
            userId:req.body.userId,
            commentCreatorEmail:req.body.commentCreatorEmail,
            commentCreatorUserName:req.body.commentCreatorUserName,
            commentText:req.body.commentText,
            createdAt:Date.now()
        });
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

const singleUpload = upload.single('image')

router.post('/single-image-upload', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.location});
  });
})

const multiUpload = upload.array('image',20)

router.post('/multi-image-upload', function(req, res) {
    console.log("Inside multi-image upload");
    multiUpload(req, res, function(err, some) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        console.log("Requested files",req.files)
        console.log("Number of images uploaded",req.files.length)
        resultArray=[]
        for(let i=0;i<req.files.length;i++)
        {
            resultArray.push({'imageUrl': req.files[i].location})
        }
        return res.json(resultArray);
    });
})
 

module.exports = router;