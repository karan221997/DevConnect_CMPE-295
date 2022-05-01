const router = require('express').Router();
const User = require('../model/User');


//register
router.post("/register", async (req, res) => {
   const user =  await new User({
            Username: req.body.Username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            bio: req.body.bio,
            followers: req.body.followers,
            following: req.body.following,
            isAdmin: req.body.isAdmin
    });
    await user.save();
    res.send(user);

});




module.exports = router;