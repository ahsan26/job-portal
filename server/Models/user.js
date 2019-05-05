import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    info: Object,
    role: {
        type: String,
        enum: ['student', 'company', 'admin'],
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

User.pre('save', function (next) {
    try {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    } catch (err) {
        return next(err);
    }
})

User.methods["isValidPassword"] = async function (newPassword) {
    try {
        return bcrypt.compare(newPassword, this.password)
    }
    catch (err) {
        return new Error();
    }
};

module.exports = mongoose.model('User', User);