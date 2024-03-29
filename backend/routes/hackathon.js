const router = require('express').Router();
const Hackathon = require('../model/hackathon');

router.get('/', async (req, res) => {
    try {
        const hackathons = await Hackathon.find();
        res.json(hackathons);
    } catch (err) {
        res.json({ message: err });
    }
}
);

router.post('/', async (req, res) => {
    const hackathon = new Hackathon({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        winningPoints: req.body.winningPoints,
        maxTeamSize: req.body.maxTeamSize,
        time: req.body.time
    });
    try {
        const savedHackathon = await hackathon.save();
       res.status(200).json(savedHackathon);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
);

//add participants to hackathon
router.post('/addParticipants', async (req, res) => {
   try{
     const hackathon = await Hackathon.findOne({_id:req.body.hackathonId});
        hackathon.participants.push({
            userId:req.body.userId,
            userName:req.body.userName,
            userEmail:req.body.userEmail
        });
        const savedHackathon = await hackathon.save();
        res.status(200).json(savedHackathon);

   }
    catch(err){
        res.status(500).json({message: err});
    }

});



module.exports = router;