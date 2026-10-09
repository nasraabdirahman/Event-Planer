import express from "express"
import Event from "../../interfaces/Event";
import RouteServiceEvent from "../../../modelBackend/servicesBackend/routeServiceEvent";


const router = express.Router();
const service = new RouteServiceEvent();

router.post("/createEvent", async (req, res) => {
    const event = req.body as Event;
    const result = await service.createEvent(event);
    res.json(result);
})

router.post("/updateEvent/:id", async (req, res) => {
    const event = req.body as Event;
    const eventId = req.params.id;
    const result = await service.updateEvent(eventId, event);
    res.json(result);
})

router.get("/getUserEvents/:id", async (req, res) => {
    const eventId = req.params.id;
    const result = await service.getUserEvents(eventId);
    res.json(result);
})

router.get("/getEventById/:id", async (req, res) => {
    const eventId = req.params.id;
    const result = await service.getEventById(eventId);
    res.json(result);
})

router.get("/getAllEvents", async (_req, res) => {
    const result = await service.getAllEvents();
    res.json(result);
});


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