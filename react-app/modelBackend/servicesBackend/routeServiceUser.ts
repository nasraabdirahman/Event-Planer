import db from "../MongoDB/initDB";
import { ObjectId } from "mongodb";
import User from "../../src/interfaces/User";

export default class RouterServiceUser{

    async createUser(user:User){
        return await db.collection<User>("User").insertOne(user);
    }

    async getUser(_id:string) {
        const userId = new ObjectId(_id);
        /*await db.collection<User>("User").find().toArray();*/
        return await db.collection<User>("User").findOne({ _id: userId }) ;
    }

    async getUserByLogin(email: string, password: string){
        return await db.collection<User>("User").findOne({email: email, password: password});
    }
    async getAllUser()
    {
        return await db.collection<User>("User").find().toArray();
    }
    async searchUsers(searchText: string) {
       return await db.collection<User>("User")
           .find({
               username: { $regex: searchText, $options: "i" }
            })
            .project({ password: 0 })
            .limit(10)
            .toArray();
}
    async deleteUser(_id:string)
    {
        const userId = new ObjectId(_id);
        return await db.collection<User>("User").deleteOne({_id: userId})
    }
}