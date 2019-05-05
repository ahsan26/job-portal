import User from "../Models/user";
import JWT from "jsonwebtoken";
import key from "../Utils/key";
const signToken = user => JWT.sign({ userId: user.id }, key)

const signUp = (req, res) => {
    const { email, role } = req.body;
    User.find({ email }, (err, data) => {
        if (data.length) return res.status(400).json({ status: false, err: "Email address already exists!" })
        req.body.info = {};
        if (role === 'company') {
            req.body.info.jobsPosted = [];
        } else if (role === 'student') {
            req.body.info.jobsApplied = [];
        }
        const newUser = new User(req.body);
        newUser.save((err, data) => {
            if (err) return res.status(400).json({ status: false, err });
            const token = signToken(data);
            data.password = '';
            res.status(200).json({ status: true, data, token });
        });
    })
};

const signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, async (err, data) => {
        if (!data) return res.status(400).json({ status: false, err: 'Wrong Credentials' })
        const checkPassword = await data.isValidPassword(password);
        if (!checkPassword) return res.status(400).json({ status: false, err: 'Password is Wrong' });
        data.password = '';
        return res.status(200).json({ status: true, data, token: signToken(data) });
    })
}

const getAllStudents = (req, res) => {
    User.find({ role: 'student' }, { password: 0 }, (err, students) => {
        if (err) return res.status(400).json({ status: false, err });
        res.status(200).json({ status: true, students })
    })
}

const getAllCompanies = (req, res) => {
    User.find({ role: 'company' }, { password: 0 }, (err, companines) => {
        if (err) return res.status(400).json({ status: false, err });
        res.status(200).json({ status: true, companines })
    })
}



const removeStudent = (req, res) => {
    const studentId = { _id: req.params.id }
    User.remove(studentId, err => {
        if (err) return res.status(400).json({ status: false, err });
        res.status(200).json({ status: true })
    })
}

const removeCompany = (req, res) => {
    const companyId = { _id: req.params.id }
    User.remove(companyId, err => {
        if (err) return res.status(400).json({ status: false, err });
        res.status(200).json({ status: true })
    })
}

module.exports = { signUp, getAllStudents, signIn, getAllCompanies, removeCompany, removeStudent }