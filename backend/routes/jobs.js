const router = require('express').Router();
const Job = require('../model/Jobs');

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.json({ message: err });
    }
}
);

router.post('/', async (req, res) => {
    console.log(req.body);
    const job = new Job({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        salary: req.body.salary,
        company: req.body.company,
        skills: req.body.skills,
        experience: req.body.experience,
        type: req.body.type
    });
    try {
        const savedJob = await job.save();
       res.status(200).json(savedJob);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
);

//apply for job
router.post('/apply', async (req, res) => {
    try{
        const job = await Job.findOne({_id:req.body.jobId});
        job.applicants.push({
            userId:req.body.userId,
            userName:req.body.userName,
            userEmail:req.body.userEmail
        });
        const savedJob = await job.save();
        res.status(200).json(savedJob);
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

module.exports = router;