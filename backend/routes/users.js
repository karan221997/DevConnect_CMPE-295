const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
//update users
router.put("/:id", async (req, res) => {
   
   if(req.body.userId === req.params.id || req.body.isAdmin){

       if(req.body.password){

           try{
                const salt = await bcrypt.genSalt(10);
                 req.body.password = await bcrypt.hash(req.body.password, salt);
                
           }
              catch(err){
                    res.status(500).json({message: err});
                }

       }

       //update user
         try{
                const user = await User.findByIdAndUpdate(req.params.id, { $set :req.body});
                res.status(200).json({message: "User updated successfully", user});
         }
            catch(err){
                res.status(500).json({message: err});
            }

   }
    else{
        res.status(403).json({message: "Unauthorized , only admin can update other users"});
    }


});

//delete user 

router.delete("/:id", async (req, res) => {
   
   if(req.body.userId === req.params.id || req.body.isAdmin){

       //delete user
         try{
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Account has been deleted successfully"});
         }
            catch(err){
                res.status(500).json({message: err});
            }

   }
    else{
        res.status(403).json({message: "Unauthorized , only admin can delete other users"});
    }


});

//get user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const{password,updatedAt,createdAt,__v,...other} = user._doc;
        res.status(200).json({message: "User found", other});

    }
    catch(err){
        res.status(500).json({message: err});
    }

});

//follow a user

router.put("/:id/follow", async (req, res) => {

    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentuser = await User.findById(req.body.userId);
            if(!user.followers.includes(currentuser._id)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentuser.updateOne({$push: {following: req.params.id}});
                res.status(200).json({message: "User followed successfully"});
            }
            else{
               res.status(403).json({message: "User already followed"});
            }
        }
        catch(err){
            res.status(500).json({message: err});
        }

    }
    else{
        res.status(403).json({message: "Unauthorized , you can't follow yourself"});
    }

});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    
        if(req.body.userId !== req.params.id){
            try{
                const user = await User.findById(req.params.id);
                const currentuser = await User.findById(req.body.userId);
                if(user.followers.includes(currentuser._id)){
                    await user.updateOne({$pull: {followers: req.body.userId}});
                    await currentuser.updateOne({$pull: {following: req.params.id}});
                    res.status(200).json({message: "User unfollowed successfully"});
                }
                else{
                     res.status(403).json({message: "You dont follow this user"});
                }
            }
            catch(err){
                res.status(500).json({message: err});
            }

        }
        else{
            res.status(403).json({message: "Unauthorized , you can't unfollow yourself"});
        }

});

module.exports = router;