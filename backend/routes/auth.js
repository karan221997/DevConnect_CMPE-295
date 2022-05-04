const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');


//register
router.post("/register", async (req, res) => {
    try{
        //generate password
        console.log("inside register api");
        console.log(req.body);
        console.log(req.body.userName);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.phoneNumber);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const user =  await new User({
            userName: req.body.userName,
            phoneNumber:req.body.phoneNumber,
            email: req.body.email,
            password: hashPassword,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            bio: req.body.bio,
            followers: req.body.followers,
            following: req.body.following,
            isAdmin: req.body.isAdmin
    });
    console.log("============================");
    console.log(user.userName);

        //save user and return response
        const savedUser = await user.save();
        console.log("user registered");
        res.status(200).json(savedUser);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }

});


//login
router.post("/login", async (req, res) => {
    try{
        //find user
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json({message: "User not found"});
        //compare password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        !isMatch && res.status(400).json({message: "Invalid password"});
        //return user
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: err});
    
    }
});


module.exports = router;