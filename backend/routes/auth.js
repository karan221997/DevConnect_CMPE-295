const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');


//register
router.post("/register", async (req, res) => {
  try{
      //check if user already exists
        const user = await User.findOne({email: req.body.email});
        if(user){
            res.status(400).send({message: "User already exists"});
        }else
        {
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            //create new user
            const newUser = new User({
                userName: req.body.userName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hashedPassword
            });
            //save user
            await newUser.save();
            res.status(200).send({message: "User created successfully"});
        }
        
    }catch(err){
        res.status(500).send({message: err.message});
    }
});


//login
router.post("/login", async (req, res) => {
    try{
     

        console.log("inside login api");
        console.log(req.body);
        console.log(req.body.email);
        console.log(req.body.password);
        const user = await User.findOne({email: req.body.email});
        if(!user){
            console.log("user not found");
            res.status(401).json({message: "User not found"});
        }else{
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if(!isMatch){
                res.status(401).json({message: "Invalid password"});
            }else{
                res.status(200).json(user);
            }
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }

});



module.exports = router;