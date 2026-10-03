import type EventDB from "../EventDB";
import db from "../../MongoDB/initDB";
import { ObjectId } from "mongodb";
export default class RouteServiceEvent {
    async CreateEvent(event: EventDB) {
        return await db.collection<EventDB>("Events").insertOne(event);
    }

    async getUserEvents(_id: string) {
        const userId = new ObjectId(_id);
        return await db.collection<EventDB>("Events").find({ userId: userId }).toArray();
    }

    async getAllEvents() {
        return await db.collection<EventDB>("Events").find().toArray();
    }

    async searchEvents(text: string) {
        return await db.collection<EventDB>("Events").find({ title: { $regex: text, $options: "i" } }).toArray();
    }

    async deleteEventIndex(index: string) {
        const eventId = new ObjectId(index);
        return await db.collection<EventDB>("Events").deleteOne({ _id: eventId });
    }

    async getEventIndex(index: string) {
        const eventId = new ObjectId(index)
        return await db.collection<EventDB>("Events").findOne({ _id: eventId })
    }
}