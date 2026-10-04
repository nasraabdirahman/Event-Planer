import express from "express";
import db from "./MongoDB/initDB";
import cors from "cors";

const app = express();
app.use(express.json())
//accessible a built-in application object property used to store variables that are accessible throughout the entire lifetime of the application
app.locals.db = db;
const Port = process.env.PORT || 3000;
app.listen(process.env.Port, () => {
    console.log("Server Running on " + Port)
})


app.use(cors());
app.listen(Port, () => {
    console.log("Server listening to port" + Port)
})