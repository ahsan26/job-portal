import express from "express";
import { post, showAllJobs } from "../Controllers/jobs";
import authenticate from "../Utils/authenticate"
const Router = express.Router();

Router.post('/post', authenticate('company'), post);
Router.get('/showAllFC', authenticate("company") , showAllJobs);
Router.get('/showAllFA', authenticate("admin") , showAllJobs);

module.exports = Router;