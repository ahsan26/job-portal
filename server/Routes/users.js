import express from "express";
import { signUp, signIn, getAllStudents, getAllCompanies,checkOneCompany, removeStudent, removeCompany } from "../Controllers/users";
import authenticate from "../Utils/authenticate"
const Router = express.Router();

Router.post('/signUp', signUp);
Router.post('/signIn', signIn);

Router.get('/students', authenticate(['admin', 'company']), getAllStudents);

Router.get('/showCompanies', authenticate(['admin', 'student']), getAllCompanies);
Router.get('/company/:id', authenticate(['admin','student']), checkOneCompany);

Router.delete('/student/:id', authenticate(['admin']), removeStudent)
Router.delete('/company/:id', authenticate(['admin']), removeCompany)

module.exports = Router;