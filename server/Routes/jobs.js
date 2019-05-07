import express from "express";
import { post, showAllJobs,showAllOfThatCompany,removeJob,apply,showApplicants } from "../Controllers/jobs";
import authenticate from "../Utils/authenticate"
const Router = express.Router();

Router.post('/post', authenticate(['company']), post);
Router.get('/showAll', authenticate(['admin','student']) , showAllJobs);
Router.post('/apply', authenticate(['student']) , apply);
Router.get('/showAllOfThatCompany/:id', authenticate(['admin','company','student']) , showAllOfThatCompany);
Router.get('/applicants/:id',authenticate(['admin','company']),showApplicants)

Router.delete('/:id/:cId',authenticate(['admin']),removeJob)

module.exports = Router;