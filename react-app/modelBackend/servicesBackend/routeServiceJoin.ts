import db from "../MongoDB/initDB";
import { ObjectId } from "mongodb";
import RouteServiceEvent from "./routeServiceEvent"
import KlarnaService from "./klarnaService";


export default class RouterServicesJoin
{
    private eventService = new RouteServiceEvent();
    private klarnaService = new KlarnaService()
    async joinEvent(eventId:string, userId:string)
    {
        const event = await this.eventService.getEventIndex(eventId)
        if(!event)
        {
            throw new Error("Event not found")
        }

         if(event.userId.toString() === userId)
         {
             throw new Error("Owner cannot join their own event");
         }

         const price = Number(event.price);

         if(!Number.isFinite(price) || price < 0)
         {
            throw new Error("Invalid event Price");
         }

         //gratis events
         if(price === 0)
         {
            await this.eventService.incrementFollowerCount(eventId, userId)
            return {status: "joined"}
         }

         //Betalt event
         if(price > 0)
            {
                const payment = await this.klarnaService.createPayment(eventId, event.title, price);
                await db.collection<Event>("Events").updateOne({ _id: new ObjectId(eventId) },{$push: {klarnaSessions: {sessionId: payment.session_id,status: "pending"}
            }
        });
            return {status: "payment_required", redirectUrl: payment.redirect_url}
         }
    }

    async confirmJoin(sessionId: string)
    {
        const event = await db.collection("Events").findOne({"klarnaSessions.sessionId": sessionId})
        if (!event) 
            {
                throw new Error("Payment session not found");
            }
        const orderId = await this.klarnaService.verifyPayment(sessionId);

        if(!orderId)
        {
            throw new Error("Payment not completed")
        }
        const result = await db.collection("Events").updateOne(
            { 
                _id: event._id,
                klarnaSessions: {
                    $elemMatch: {
                        sessionId: sessionId,
                        status: "pending"
                    }
                }
            },
            {
                $inc: { followerCount: 1 },
                $set: {
                    "klarnaSessions.$.status": "completed",
                    "klarnaSessions.$.orderId": orderId
                }
            }
        );

        if(result.modifiedCount === 0)
        {
           return {status: "already_processed"}
        }

        return {status: "joined"}
    }
}