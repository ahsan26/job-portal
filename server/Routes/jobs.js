import express from "express";
import { post, showAllJobs,showAllOfThatCompany,removeJob,apply } from "../Controllers/jobs";
import authenticate from "../Utils/authenticate"
const Router = express.Router();

Router.post('/post', authenticate(['company']), post);
Router.get('/showAll', authenticate(['admin','student']) , showAllJobs);
Router.post('/apply', authenticate(['student']) , apply);
Router.get('/showAllOfThatCompany', authenticate(['company']) , showAllOfThatCompany);

Router.delete('/job/:id',authenticate(['admin']),removeJob)

module.exports = Router;