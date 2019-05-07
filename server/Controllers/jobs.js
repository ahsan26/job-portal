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
    Job.find({}, (err, jobs) => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true, jobs });
    });
}

const removeJob = (req, res) => {
    const jobId = { _id: req.params.id }
    const companyId = { _id: req.params.cId }
    Job.deleteOne(jobId, err => {
        if (err) return res.status(403).json({ status: false, err });
        User.findOne({ _id: companyId._id }, (err, data) => {
            data.info.jobsPosted = data.info.jobsPosted.filter(job => job._id !== jobId._id)
            console.log('d', data)
            User.update(companyId, data, (err, r) => {
                res.status(200).json({ status: true });
            })
        })
    })
}
const showAllOfThatCompany = (req, res) => {
    Job.find({ companyId: req.params.id }, (err, jobs) => {
        if (err) return res.status(403).json({ status: false, err });
        res.status(200).json({ status: true, jobs });
    })
}
const apply = (req, res) => {
    const { jobId } = req.body;
    User.findOne({ _id: req.userId }, (err, data) => {
        console.log(data)
        const jobsAppliedStatus = data.info.jobsApplied.find(job => job._id === jobId);
        console.log(jobsAppliedStatus)
        if (jobsAppliedStatus) return res.status(403).json({ status: false, err: "You can't apply the same job twice!" });
        Job.updateOne({ _id: jobId }, { $push: { applicants: { _id: req.userId } } }, err => {
            if (err) return res.status(403).json({ status: false, err });
            User.updateOne({ _id: req.userId }, { $push: { 'info.jobsApplied': { _id: jobId } } }, err => {
                if (err) return res.status(403).json({ status: false, err });
                res.status(200).json({ status: true });
            })
        })
    })
}

const showApplicants = (req, res) => {
    Job.findOne({ _id: req.params.id }, async (err, data) => {
        
        // console.log(222,await User.findOne({_id:data.applicants[0]._id}))
        let applicants = data.applicants.map(async a => await User.findOne({ _id: a._id }, { password: 0 }))
        const app = []
        setTimeout(_=>{
            // console.log(14123,applicants)
            applicants.forEach(a=>a.then(r=>app.push(r)));
             applicants[0].then(ress=>{
                 res.status(200).json({ status: true, applicants:app })
                })
        },1000)
    })
}

module.exports = { post, showAllJobs, showApplicants, removeJob, apply, showAllOfThatCompany };