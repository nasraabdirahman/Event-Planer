import db from "../MongoDB/initDB";
import { ObjectId } from "mongodb";
import Follow from "../../src/interfaces/Follow";

export default class RouterServicesFollow {
  async createFollower(follow: Follow) {
    follow._id = new ObjectId();
    follow.userId = new ObjectId(follow.userId);
    follow.eventId = new ObjectId(follow.eventId);
    return (await db.collection<Follow>("Follow")).insertOne(follow);
  }

  async getFollowsByUser(_id: string){
    const userId = new ObjectId(_id);
    const follow = await db.collection<Follow>("Follow").find({ userId: userId }).toArray() ;    
    return follow;
  }
  async getFollowsByUserEvent(userID: string, eventID: string){
    const userId = new ObjectId(userID);
    const eventId = new ObjectId(eventID);
    const follow = await db.collection<Follow>("Follow").find({ userId: userId, eventId: eventId}).toArray() ;    
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