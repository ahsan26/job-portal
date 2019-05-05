import mongoose from "mongoose";
mongoose.connect("mongodb://admin:123456A@ds149596.mlab.com:49596/job_portal", { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", _ => { console.log("Database is connected!"); return db; });