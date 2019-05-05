import Job from "../Models/job";
import User from "../Models/user";

const post = (req, res) => {
    req.body.companyId = req.userId;
    const newJob = new Job(req.body);
    newJob.save((err, job) => {
        if (err) return res.status(403).json({ status: false, err });
        User.update({ _id: req.userId }, { $push: { 'info.jobsPosted': { _id: job.id } } }, (err, data) => {
            res.status(200).json({ status: true, err, data })
        })
    })
}

const showAllJobs = (req, res) => {
    Job.find((err, jobs) => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true, jobs });
    });
}

const removeJob = (req, res) => {
    const jobId = { _id: req.params.id }
    Job.remove(jobId, err => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true });
    })
}
const showAllOfThatCompany = (req, res) => {
    Job.find({ companyId: req.userId }, (err, jobs) => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true, jobs });
    })
}
const apply = (req, res) => {
    const { jobId } = req.body;
    User.findOne({ _id: req.userId }, (err, data) => {
        const jobsAppliedStatus = data.info.jobsApplied.find(job => job._id === jobId);
        if (!jobsAppliedStatus) return res.status(403).json({ status: false, err: "You can't apply the same job twice!" });
        Job.update({ _id: jobId }, { $push: { applicants: { _id: req.userId } } }, err => {
            if (err) return res.status(403).json({ status: false, err });
            User.update({ _id: req.userId }, { $push: { 'info.jobsApplied': { _id: jobId } } }, err => {
                if (err) return res.status(403).json({ status: false, err });
                res.status(200).json({ status: true });
            })
        })
    })
}

module.exports = { post, showAllJobs, removeJob, apply ,showAllOfThatCompany};