import express from "express";
import { signUp, signIn, getAllStudents ,getAllCompanies} from "../Controllers/users";
import authenticate  from "../Utils/authenticate"
const Router = express.Router();

Router.post('/signUp', signUp);
Router.post('/signIn', signIn);

Router.get('/students', authenticate(['admin','company']), getAllStudents);

Router.get('/showCompanies', authenticate(['admin','student']), getAllCompanies);

module.exports = Router;