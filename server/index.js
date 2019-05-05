import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./Routes/users";
import JobRoutes from "./Routes/jobs";
import "./db";
const app = express();

app.set('PORT', 19000);
app.use(bodyParser.json());

app.use('/user', UserRoutes);
app.use('/job', JobRoutes);

app.listen(app.get('PORT'), _ => {
    console.log(`Server is Running On Port: ${app.get('PORT')}`)
});
