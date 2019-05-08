import User from "../Models/user";
import JWT from "jsonwebtoken";
import key from "../Utils/key";
import Job from "../Models/job"
const signToken = user => JWT.sign({ userId: user.id }, key)

const signUp = async (req, res) => {
    const { email, role } = req.body;
    const foundUser = await User.findOne({ email })
    if (foundUser) return res.status(400).json({ status: false, err: "Email address already exists!" })
    req.body.info = {};
    if (role === 'company') {
        req.body.info.jobsPosted = [];
    } else if (role === 'student') {
        req.body.info.jobsApplied = [];
    }
    const newUser = new User(req.body);
    newUser.save().then(data => {
        const token = signToken(data);
        data.password = '';
        res.status(200).json({ status: true, data, token });
    }).catch(err => {
        res.status(400).json({ status: false, err });
    })
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(400).json({ status: false, err: 'Wrong Credentials' })
    const checkPassword = await foundUser.isValidPassword(password);
    if (!checkPassword) return res.status(400).json({ status: false, err: 'Password is Wrong' });
    foundUser.password = '';
    return res.status(200).json({ status: true, data: foundUser, token: signToken(foundUser) });
}

const getAllStudents = async (req, res) => {
    const students = await User.find({ role: 'student' }, { password: 0 })
    if (!students) return res.status(400).json({ status: false, err: students });
    res.status(200).json({ status: true, students })
}

const getAllCompanies = async (req, res) => {
    const allCompanies = await User.find({ role: 'company' }, { password: 0 });
    if (!allCompanies) return res.status(400).json({ status: false, err: allCompanies });
    res.status(200).json({ status: true, companies: allCompanies })
}

const removeStudent = async (req, res) => {
    const studentId = { _id: req.params.id }
    let jobs = await Job.find({});
    for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < jobs[i].applicants.length; j++) {
            if (jobs[i].applicants[j]._id === req.params.id) {
                jobs[i].applicants.splice(j, 1)
            }
        }
    }
    const jobsIds = jobs.map(job => ({ _id: job._id }))
    jobsIds.forEach(async (jobId, I) => {
        await Job.update(jobId, jobs[I]);
    })
    User.deleteOne(studentId).then(async data => {
        Job.updateMany(jobs).then(_ => {
            res.status(200).json({ status: true })
        })
    }).catch(err => {
        res.status(400).json({ status: false, err });
    })
}

const removeCompany = (req, res) => {
    const companyId = { _id: req.params.id }
    User.deleteOne(companyId).then(data => {
        Job.deleteMany({ companyId: companyId._id }).then(_ => {
            res.status(200).json({ status: true })
        })
    }).catch(err => {
        res.status(400).json({ status: false, err });
    })
}
const checkOneCompany = async (req, res) => {
    const company = await User.findOne({ _id: req.params.id })
    if (!company) return res.status(400).json({ status: false, err });
    res.status(200).json({ status: true, data: company })
}
module.exports = { checkOneCompany, signUp, getAllStudents, signIn, getAllCompanies, removeCompany, removeStudent }