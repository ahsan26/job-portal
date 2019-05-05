import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./Routes/users";
import JobRoutes from "./Routes/jobs";
import "./db";
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.set('PORT', 5000);
app.use(bodyParser.json());

app.use('/user', UserRoutes);
app.use('/job', JobRoutes);

app.listen(app.get('PORT'), _ => {
    console.log(`Server is Running On Port: ${app.get('PORT')}`)
});
