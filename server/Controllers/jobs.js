import Job from "../Models/job";

const post = (req, res) => {
    req.body.companyId=  req.companyId;
    const newJob = new Job(req.body);
    newJob.save((err, data) => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true, data })
    })
}

const showAllJobs = (req, res) => {
    Job.find((err, jobs) => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true, jobs });
    });
}

module.exports = { post ,showAllJobs};