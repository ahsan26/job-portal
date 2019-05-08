import Job from "../Models/job";
import User from "../Models/user";
import mongoose from "mongoose"
const post = (req, res) => {
    req.body.companyId = req.userId;
    const newJob = new Job(req.body);
    newJob.save().then(job => {
        User.updateOne({ _id: req.userId }, { $push: { 'info.jobsPosted': { _id: job.id } } }).then(r => {
            res.status(200).json({ status: true, data: job })
        })
    }).catch(err => {
        return res.status(403).json({ status: false, err });
    })
}
const showAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    if (!jobs) return res.status(403).json({ status: false, err });
    res.status(200).json({ status: true, jobs });
}

const removeJob = (req, res) => {
    const jobId = { _id: req.params.id }
    const companyId = { _id: req.params.cId }
    Job.deleteOne(jobId).then(_ => {
        User.findOne({ _id: companyId._id }).then(data => {
            data.info.jobsPosted = data.info.jobsPosted.filter(job => job._id !== jobId._id)
            User.update(companyId, data).then(r => {
                res.status(200).json({ status: true });
            })
        });
    })
        .catch(err => {
            res.status(403).json({ status: false, err });
        })
}
const showAllOfThatCompany = async (req, res) => {
    const jobs = await Job.find({ companyId: req.params.id });
    if (!jobs) return res.status(403).json({ status: false, err });
    res.status(200).json({ status: true, jobs });
}
const apply = async (req, res) => {
    const { jobId } = req.body;
    const foundStudent = await User.findOne({ _id: req.userId })
    if (foundStudent) {
        const jobsAppliedStatus = foundStudent.info.jobsApplied.find(job => job._id === jobId);
        if (jobsAppliedStatus) return res.status(403).json({ status: false, err: "You can't apply the same job twice!" });
        Job.updateOne({ _id: jobId }, { $push: { applicants: { _id: req.userId } } }).then(r => {
            User.updateOne({ _id: req.userId }, { $push: { 'info.jobsApplied': { _id: jobId } } }).then(re => {
                res.status(200).json({ status: true });
            }).catch(err => {
                res.status(403).json({ status: false, err });
            })
        }).catch(err => {
            res.status(403).json({ status: false, err });
        })
    }
}

const showApplicants = (req, res) => {
    Job.findOne({ _id: req.params.id }, async (err, data) => {
        User.find({
            '_id': {
                $in:
                    data.applicants.map(applicant => mongoose.Types.ObjectId(`${applicant._id}`))
            }
        }).then(applicants => {
            res.status(200).json({ status: true, applicants })
        }).catch(err => {
            res.status(403).json({ status: false, err });
        })
    })
}

module.exports = { post, showAllJobs, showApplicants, removeJob, apply, showAllOfThatCompany };