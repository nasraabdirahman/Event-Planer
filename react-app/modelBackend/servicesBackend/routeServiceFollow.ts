import db from "../MongoDB/initDB";
import { ObjectId } from "mongodb";
import Follow from "../../src/interfaces/Follow";

export default class RouterServicesFollow {
  async createFollower(follow: Follow) {
    return (await db.createCollection<Follow>("Follow")).insertOne(follow);
  }

  async getFollowsByUser(_id: string){
    const userId = new ObjectId(_id);
    const follow = await db.collection<Follow>("Follow").find({ userId: userId }).toArray() ;    
    return follow;
  }

   async getFollowsByEvent(_id: string){
    const eventId = new ObjectId(_id);
    return await db.collection<Follow>("Follow").find({ eventId: eventId }).toArray() ;    
  }

  async deleteFollow(_id: string){
    const followId = new ObjectId(_id);
    return await db.collection<Follow>("Follow").deleteOne({ _id: followId }) ;    
  }
}