import express from "express";
import { signUp, signIn, getAllStudents, getAllCompanies, removeStudent, removeCompany } from "../Controllers/users";
import authenticate from "../Utils/authenticate"
const Router = express.Router();

Router.post('/signUp', signUp);
Router.post('/signIn', signIn);

Router.get('/students', authenticate(['admin', 'company']), getAllStudents);

Router.get('/showCompanies', authenticate(['admin', 'student']), getAllCompanies);

Router.delete('/student/:id', authenticate(['admin']), removeStudent)
Router.delete('/company/:id', authenticate(['admin']), removeCompany)

module.exports = Router;