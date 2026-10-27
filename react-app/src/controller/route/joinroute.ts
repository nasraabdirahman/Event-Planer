
import express from "express";
import { ObjectId } from "mongodb";
import db from "../../../modelBackend/MongoDB/initDB";
import RouteServiceEvent from "../../../modelBackend/servicesBackend/routeServiceEvent";

const router = express.Router();
const eventService = new RouteServiceEvent();

const baseUrl = "https://api.playground.klarna.com";

// Adds a new follower and increases the stored event count
async function addFollower(eventid: ObjectId, userid: ObjectId) {
    const result = await db.collection("Follow").updateOne({ eventId: eventid, userId: userid },
        {
            $setOnInsert: {
                eventId: eventid,
                userId: userid,
                notifications: false
            }
        },
        { upsert: true }
    );

    if (result.upsertedCount === 1) {
        await db.collection("Events").updateOne(
            { _id: eventid },
            { $inc: { followerCount: 1 } }
        );
    }
}

// Start JOIN
router.post("/start", async (req, res) => {
    try {
        const { eventId, userId } = req.body;
        if (typeof eventId !== "string" || typeof userId !== "string" ||!ObjectId.isValid(eventId) ||!ObjectId.isValid(userId)) {
            return res.status(400).json({message: "Invalid event or user ID"});
        }
        const events = await eventService.getEventById(eventId);
        const event = Array.isArray(events) ? events[0] : events;
        if (!event) 
            {
                return res.status(404).json({message: "Event not found"});
            }
        const price = Number(event.price);
        if (!Number.isFinite(price) || price < 0) {return res.status(400).json({message: "Invalid event price"});}
        const eventid = new ObjectId(eventId);
        const userid = new ObjectId(userId);
        // Check whether the user already joined
        const existingFollow = await db.collection("Follow").findOne({eventId: eventid,userId: userid});
        if (existingFollow) {
            return res.json({ status: "joined" });
        }

        // Free event
        if (price === 0) {
            await addFollower(eventid, userid);

            return res.json({ status: "joined" });
        }
        // Paid event: Klarna Playground
        const username = process.env.KLARNA_USERNAME;
        const password = process.env.KLARNA_PASSWORD;

        if (!username || !password) {return res.status(500).json({message: "Klarna credentials missing"});}
        const authorization = Buffer.from(`${username}:${password}`).toString("base64");
        // sek -> öre
        const amount = Math.round(price * 100);
        // Create Klarna Payments session
        const paymentResponse = await fetch(`${baseUrl}/payments/v1/sessions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authorization}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    purchase_country: "SE",
                    purchase_currency: "SEK",
                    order_amount: amount,
                    order_lines: [
                        {
                            name: event.title,
                            quantity: 1,
                            unit_price: amount,
                            total_amount: amount
                        }
                    ]
                })
            }
        );
        if (!paymentResponse.ok) {
            console.error(
                "Klarna payment error:",
                await paymentResponse.text()
            );
            return res.status(502).json({
                message: "Could not create payment session"
            });
        }
        const paymentSession: { session_id: string } =
            await paymentResponse.json();
        // Create Klarna Hosted Payment Page
        const hppResponse = await fetch(
            `${baseUrl}/hpp/v1/sessions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authorization}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    payment_session_url:
                        `${baseUrl}/payments/v1/sessions/${paymentSession.session_id}`,
                    merchant_urls: {
                        success:
                            `http://localhost:5173/event/${eventId}?payment=success&sessionId={{session_id}}`,
                        back:
                            `http://localhost:5173/event/${eventId}`,
                        failure:
                            `http://localhost:5173/event/${eventId}?payment=failed`
                    },
                    options: {
                        place_order_mode: "PLACE_ORDER"
                    }
                })
            }
        );
        if (!hppResponse.ok) {
            console.error(
                "Klarna HPP error:",
                await hppResponse.text()
            );
            return res.status(502).json({
                message: "Could not create Klarna checkout"
            });
        }
        const hppSession: {
            session_id: string;
            redirect_url: string;
        } = await hppResponse.json();
        // Remember which event and user belong to this payment
        await db.collection("PendingPayments").insertOne({
            eventId: eventid,
            userId: userid,
            klarnaSessionId: hppSession.session_id,
            status: "pending",
            createdAt: new Date()
        });
        return res.json({
            status: "payment_required",
            redirectUrl: hppSession.redirect_url
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not join event"
        });
    }
});
// Confirm paid JOIN
router.post("/confirm/:sessionId", async (req, res) => {
    try {
        const sessionId = req.params.sessionId;

        if (typeof sessionId !== "string" || !sessionId) {
            return res.status(400).json({
                message: "Invalid session ID"
            });
        }
        const payments = db.collection("PendingPayments");
        const pending = await payments.findOne({
            klarnaSessionId: sessionId
        });
        if (!pending) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }
        const username = process.env.KLARNA_USERNAME;
        const password = process.env.KLARNA_PASSWORD;
        if (!username || !password) {
            return res.status(500).json({
                message: "Klarna credentials missing"
            });
        }
        const authorization = Buffer.from(`${username}:${password}`).toString("base64");
        // Verify status directly with Klarna
        const response = await fetch(
            `${baseUrl}/hpp/v1/sessions/${encodeURIComponent(sessionId)}`,
            {
                headers: {
                    Authorization: `Basic ${authorization}`
                }
            }
        );
        if (!response.ok) {
            return res.status(502).json({
                message: "Could not verify payment"
            });
        }
        const payment: {
            status: string;
            order_id?: string;
        } = await response.json();
        if (payment.status !== "COMPLETED" || !payment.order_id) {
            return res.status(409).json({
                message: "Payment not completed"
            });
        }
        // Only now add the follower and increment the count
        await addFollower(pending.eventId, pending.userId);
        await payments.updateOne(
            { _id: pending._id },
            {
                $set: {
                    status: "completed",
                    klarnaOrderId: payment.order_id
                }
            }
        );
        return res.json({ status: "joined" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not confirm payment"
        });
    }
});

export default router;