import mongoose from "mongoose";
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    salary_range: {
        type: String,
        required: true
    },
    applicants: Array,
    companyId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Job', JobSchema);