import JWT from "jsonwebtoken";
import key from "../Utils/key"
import User from "../Models/user";

const validate = (req, res, next, roles) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ status: false, err: 'No Token Provided!' });
    JWT.verify(token, key, (errr, decoded) => {
        if (errr) return res.status(403).json({ status: false, message: "Failed to authenticate token" });
        req.userId = decoded.userId;
        User.findOne({ _id: req.userId }, (err, user) => {
            if (err) return res.status(403).json({ status: false, message: "Failed to authenticate token" });
            if (!user) return res.status(403).json({ status: false, message: "Failed to fetch user infomation!" });
            const roleMathed = roles.find(role => role === user.role);
            if (!roleMathed) return res.status(403).json({ status: false, err: `Only ${roles} Allowed to Access This Action` })
            return next();
        })
    })
}

const authenticate = roles => (req, res, next) => {
    validate(req, res, next, roles)
};

module.exports = authenticate;