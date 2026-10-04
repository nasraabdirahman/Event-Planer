import express from "express"
import process from "process"
import cors from "cors"
import eventRouter from "../model/route/eventroutes"
import userRouter from "../model/route/userroute"

const app = express()
const Port = process.env.PORT || 3000 
app.use(cors());
app.listen(Port, () =>{
    console.log("Express listening on port" + Port);
})
app.use("/users", userRouter);
app.use("/events", eventRouter);