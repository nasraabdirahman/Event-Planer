import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"])

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
    process.exit(1);
}

const db = client.db("EventPlanner");

export default db;