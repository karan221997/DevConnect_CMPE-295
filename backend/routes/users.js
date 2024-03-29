const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Conversation = require('../model/Conversation');

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
    const requester = req.body.userId;
    const requested = req.params.id;

    if(requester !== requested){
        try{
            
            const user = await User.find({email:requested});
            
            const currentuser = await User.find({email:requester});
            console.log("requester "+currentuser[0].email);
            console.log("requested to "+user[0].email)
            console.log("------------------")

            console.log("added person"+user[0]);
            console.log("adding person"+currentuser[0]);

            if(!user[0].following.includes(currentuser[0].email)){
                console.log("inside")
                
                const xyz = await user[0].updateOne({$push: {following: requester}});
                const abc = await currentuser[0].updateOne({$push: {following: requested}});
                console.log("SUCCESS"+ abc[0]);
                res.status(200).json({message: "User followed successfully"});
            }
            else{
                console.log("ALREADY FRND");
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
router.put("/:email/unfollow", async (req, res) => {

    console.log("1"+req.body.email);
    console.log("2"+req.params.email)
    
        if(req.body.email !== req.params.email){
            try{

                const user = await User.find({email:req.params.email});


                const currentuser = await User.find({email:req.body.email});

             
                if(user[0].following.includes(currentuser[0].email)){
                   
                    const abc = await user[0].update({$pull: {following: req.body.email}});

                    await currentuser[0].update({$pull: {following: req.params.email}});
                    console.log("user unfollowed successfully");
                    res.status(200).json({message: "User unfollowed successfully"});
                }
                else{
                    console.log("you dont follow this user");
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
        console.log("------------------------------------------------------");
        const friends = await Promise.all(
            user[0].following.map((friendId)=>{
                return User.find({email:friendId});
            })
        );
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("hhh");
        console.log("friends -- "+friends);

        let friendList = [];
    friends.map((friend) => {
      const { _id, email, userName } = friend;
      friendList.push({ _id, email, userName });
    });
    console.log("LIST OF FRNDS "+friendList);
    res.status(200).json(friendList)

        //res.status(200).json({message: "Users found", user});

    }
    catch(err){
        res.status(500).json({message: err});
    }
}
);

//updte user
router.put("/:id", async (req, res) => {
    if(req.body._id === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err){
                return res.status(500).json({message: err});
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({message: "Account updated successfully"});
        }
        catch(err){
            res.status(500).json({message: err});
        }
    }
    else{
        res.status(403).json({message: "You can update only your account"});
    }
});


// add friends to a user
router.post("/addfriends/:id", async (req, res) => {
  console.log("inside add friends");
  //current user which is logged in
    const currentUser = await User.findById(req.params.id);
    console.log("current user "+currentUser);
    //profile user which is being viewed
    const profileUser = await User.findById(req.body.profilePageUserId);
    console.log("profile user "+profileUser);

    //upadte the current user
    currentUser.friends.push({
        userId: profileUser._id,
        userName: profileUser.userName,
        email: profileUser.email,
    });
    const savedCurrentUser = await currentUser.save();

    //update the profile user
    profileUser.friends.push({
        userId: currentUser._id,
        userName: currentUser.userName,
        email: currentUser.email,
    });
    const savedProfileuser = await profileUser.save();

   const newConversation = new Conversation({
        members: [currentUser.email, profileUser.email],
      });
    
    const savedConversation = await newConversation.save();

    res.status(200).json(savedCurrentUser);
});



module.exports = router;