import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGODB_URL || ""
const client = new MongoClient(url);
try{
    //connect client to server
    await client.connect();
    console.log("Connected")
}
catch (err)
{
    console.log(err);
}

const db = client.db("EventPlaner");

export default db;