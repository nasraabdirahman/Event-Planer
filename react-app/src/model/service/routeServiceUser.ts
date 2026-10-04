import db from "../../MongoDB/initDB";
import { ObjectId } from "mongodb";
import UserDB from "../UserDB";

export default class RouterServiceUser{

    async createUser(user:UserDB){
        return (await db.createCollection<UserDB>("Users")).insertOne(user);
    }

    async getUser(_id:string)
    {
        const userId = new ObjectId(_id);
        return await db.collection<UserDB>("Users").findOne({userId: userId});
    }

    async getUserByLogin(email: string, password: string) 
    {
        return await db.collection<UserDB>("Users").findOne({email: email, password:password});
    }
    async getAllUser()
    {
        return await db.collection<UserDB>("Users").find().toArray();
    }

    async deleteUser(_id:string)
    {
        const userId = new ObjectId(_id);
        return await db.collection<UserDB>("Users").deleteOne({_id: userId})
    }
}