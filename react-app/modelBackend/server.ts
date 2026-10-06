import express from "express"
import db from "./MongoDB/initDB"
import process from "process"
import cors from "cors"
import eventRouter from "../src/controller/route/eventroutes"
import userRouter from "../src/controller/route/userroute"
import followRouter from "../src/controller/route/followroute"

const app = express()
app.use(express.json())
app.locals.db = db ;
const Port = process.env.PORT || 3000 ;
app.use(cors());

app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/follows", followRouter);

app.listen(Port, () =>{
    console.log("Express listening on port" + Port);
})
