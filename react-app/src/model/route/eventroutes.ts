import express from "express"
import type EventDB from "../EventDB";
import RouteServiceEvent from "../service/routeServiceEvent";


const router = express.Router();
const service = new RouteServiceEvent();

router.post("/createEvent", async (req, res) => {
    const event = req.body as EventDB;
    const result = await service.CreateEvent(event);
    res.json(result);
})

router.get("/getUserEvents/:id", async (req, res) => {
    const eventId = req.params.id;
    const result = await service.getUserEvents(eventId);

    res.json(result);
})

router.get("/getAllEvents", async (_req, res) => {
    const result = await service.getAllEvents();
    res.json(result);
})


router.get("/search/:text", async (req, res) => {
    const text = req.params.text;
    const result = await service.searchEvents(text);
    res.json(result);
})

router.delete("/deleteEvent/:id", async (req, res) => {
    const eventId = req.params.id;
    const result = await service.deleteEventIndex(eventId);
    res.json(result + "has been deleted");
})

export default router;