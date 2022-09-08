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

//get user by email
router.get("/getUserByEmail/:email", async (req, res) => {
    try{
        console.log("get users by email");
        console.log(req.params.email)
        const user = await User.find({email:req.params.email});
        console.log(user);
        res.status(200).json({user});
    }
    catch(err){
        res.status(500).json({message: err});
    }

});

//follow a user

router.put("/:id/follow", async (req, res) => {
    console.log("inside follow");
    //req.body.userId is the logged in users id
    //req.params.id is the id of the other person the logged in user is adding
    
    console.log();

    if(req.body.userId !== req.params.id){
        try{
            
            const user = await User.find({email:req.params.id});
            
            const currentuser = await User.find({email:req.body.userId});
            console.log(currentuser[0].email);
            console.log("------------------")
            console.log(user[0].followers.includes(currentuser[0].email));
            if(!user[0].followers.includes(currentuser[0].email)){
                console.log("inside")
                console.log(req.body.userId);
    console.log(req.params.id);
                await user[0].updateOne({$push: {following: req.body.userId}});
                await currentuser[0].updateOne({$push: {following: req.params.id}});
                console.log("SUCCESS");
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
        console.log("else part");
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

//serach users
router.get("/:name/search", async (req, res) => {
    try{
        const users = await User.find({userName: {$regex: req.params.name, $options: 'i'}});
        res.status(200).json({message: "Users found", users});

    }
    catch(err){
        res.status(500).json({message: err});
    }

}
);

//get all users
router.get("/", async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({message: "Users found", users});

    }
    catch(err){
        res.status(500).json({message: err});
    }
}
);

//get all friends
router.get("/friends/:email", async (req, res) => {
    try{
        console.log("GET ALL FRNDS");
        const user = await User.find({email:req.params.email});
        console.log(user);
        console.log("foll - "+user[0].isAdmin);
        console.log("foll - "+user[0].following);
        const friends = await Promise.all(
            user[0].following.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        console.log("friends -- "+friends);

        let friendList = [];
    friends.map((friend) => {
      const { _id, email, userName, profilePicture } = friend;
      friendList.push({ _id, email, userName, profilePicture });
    });
    res.status(200).json(friendList)

        //res.status(200).json({message: "Users found", user});

    }
    catch(err){
        res.status(500).json({message: err});
    }
}
);



module.exports = router;