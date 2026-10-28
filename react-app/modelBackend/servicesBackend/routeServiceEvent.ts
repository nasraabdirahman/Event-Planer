import type Event from "../../src/interfaces/Event";
import db from "../MongoDB/initDB";
import { ObjectId } from "mongodb";
type EventWithJoins = Event & {
    joinedUserIds?: ObjectId[];
};
export default class RouteServiceEvent {
    async createEvent(event: Event) {
        const _id = new ObjectId();
        const userId = new ObjectId(event.userId);
        const newEvent = {...event, _id, userId,
            startTimeDate: new Date(event.startTimeDate),
            endTimeDate: new Date(event.endTimeDate),}
        return await db.collection<Event>("Events").insertOne(newEvent) ;
    }

    async updateEvent(eventId: string, event: Event) {
        return await db.collection<Event>("Events").updateOne({ _id: new ObjectId(eventId) }, { $set:{
            userId: new ObjectId(event.userId),
            title: event.title,
            location: event.location,
            description: event.description,
            price: event.price,
            interest: event.interest, 
            startTimeDate: new Date(event.startTimeDate),
            endTimeDate: new Date(event.endTimeDate),
        },
        });
    }

    async getUserEvents(_id: string) {
        const userId = new ObjectId(_id);
        return await db.collection<Event>("Events").find({ userId: userId }).toArray();
    }

    async getEventById(_id: string) {
        const eventId = new ObjectId(_id);
        const result = await db.collection<Event>("Events").find({ _id: eventId  }).toArray();
        return result ;
    }

    async getAllCurrentEvents() {
        const today = new Date();
        return await db.collection<Event>("Events").find({endTimeDate: {$gte: today }}).toArray();
    }

    async getUserCurrentEvents(_id: string) {
        const userId = new ObjectId(_id);
        const today = new Date();
        return await db.collection<Event>("Events").find({userId: userId, endTimeDate: {$gte: today }}).toArray();
    }

    async getUserArchivedEvents(_id:string) {
        const userId = new ObjectId(_id);
        const today = new Date();
        return await db.collection<Event>("Events").find({userId: userId, endTimeDate: {$lt: today }}).toArray();
    }

    async searchEvents(text: string) {
        return await db.collection<Event>("Events").find({ title: { $regex: text, $options: "i" } }).toArray();
    }

    async deleteEventIndex(index: string) {
        const eventId = new ObjectId(index);
        return await db.collection<Event>("Events").deleteOne({ _id: eventId });
    }

    async getEventIndex(index: string) {
        const eventId = new ObjectId(index)
        return await db.collection<Event>("Events").findOne({ _id: eventId })
    }
    async incrementFollowerCount(eventId:string, userId: string) {
         const event = await this.getEventIndex(eventId);
         if(!event)
         {
            throw new Error("Event not found")
         }
         //kontrollerar om användaren äger eventet
         if(event.userId.toString() === userId)
         {
             throw new Error("Owner cannot join their own event");
         }
         const userObjectId = new ObjectId(userId);
         return await db.collection<EventWithJoins>("Events").updateOne({_id: new ObjectId(eventId), userId: { $ne: userObjectId }, joinedUserIds: { $ne: userObjectId }},
         {$inc: { followerCount: 1 },$addToSet: { joinedUserIds: userObjectId }});
        }
}