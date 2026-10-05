import type Event from "../../src/interfaces/Event";
import db from "../MongoDB/initDB";
import { ObjectId } from "mongodb";
export default class RouteServiceEvent {
    async CreateEvent(event: Event) {
        return await db.collection<Event>("Events").insertOne(event);
    }

    async getUserEvents(_id: string) {
        const userId = new ObjectId(_id);
        return await db.collection<Event>("Events").find({ userId: userId }).toArray();
    }

    async getEventById(_id: string) {
        const eventId = new ObjectId(_id);
        
        const result = await db.collection<Event>("Events").find({ eventId: eventId  }).toArray();
        return result ;
    }

   async getAllEvents() {
        /*await db.listCollections().toArray();*/
        return await db.collection<Event>("Events").find().toArray();
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
}