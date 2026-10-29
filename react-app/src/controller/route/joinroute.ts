import express from "express"
import { ObjectId } from "mongodb"
import RouterServicesJoin from "../../../modelBackend/servicesBackend/routeServiceJoin";

const router = express.Router();
const joinService = new RouterServicesJoin();

//join
router.post("/start", async(req, res) => {
    try {
        const {eventId, userId} = req.body;

        if(typeof userId !== "string" || typeof eventId !== "string" || !ObjectId.isValid(eventId) || !ObjectId.isValid(userId))
        {
            return res.status(400).json({message: "invalid event or user ID"})
        }

        const result = await joinService.joinEvent(eventId, userId);
        return res.json(result);
    }
    catch
    {
        return res.status(500).json({message: "Could not join event"})
    }
})

//bekräfta klarna betalning
router.post("/confirm/:sessionId", async(req, res) => {
    try{
        const sessionId = req.params.sessionId

        if (typeof sessionId !== "string" || !sessionId) {
            return res.status(400).json({message: "Invalid session ID"});
        }

        const result = await joinService.confirmJoin(sessionId);

        return res.json(result)
    }
    catch
    {
        return res.status(400).json({message: "Could not confirm payment"})
    }
})

export default router