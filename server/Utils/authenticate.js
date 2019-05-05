import JWT from "jsonwebtoken";
import key from "../Utils/key"
import User from "../Models/user";

const validate = (checkRole, req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ status: false, err: 'No Token Provided!' });
    JWT.verify(token, key, (err, decoded) => {
        if (err) return res.status(403).json({ status: false, message: "Failed to authenticate token" });
        req[`${checkRole}Id`] = decoded.userId;
        User.findOne({ _id: req[`${checkRole}Id`] }, (err, user) => {
            if (user.role !== checkRole) return res.status(403).json({ status: false, err: `Only ${roles} Allowed to Access This Information` })
            return next();
        })
    })
}

const authenticate = roles => (req, res, next) => {
    for (let i = 0; i < roles.length; i++) {
        validate(roles[i], req, res, next)
    }
};

module.exports = authenticate;