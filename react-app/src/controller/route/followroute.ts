import RouterServicesFollow from "../../../modelBackend/servicesBackend/routeServiceFollow";
import Follow from "../../interfaces/Follow";
import express from "express"

const router = express.Router();
const service = new RouterServicesFollow();

router.post("/createFollow", async (req, res) => {
    try {
        const followInfo = req.body as Follow;
        const result = await service.createFollower(followInfo)
        res.json(result);
    }
    catch {
        res.status(409);
    }
})

router.get("/getFollowsByUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const result = await service.getFollowsByUser(userId)
        res.json(result);
    }
    catch  {
        res.status(404)
    }
})


router.get("/getFollowsByEvent/:eventId", async (req, res) => {
    try {
        const eventId = req.params.eventId
        const result = await service.getFollowsByEvent(eventId)

        res.json(result);
    }
    catch  {
        res.status(404)
    }
})

router.delete("/deleteFollow/:id", async (req, res) => {
    try {
        const followId = req.params.id
        const result = await service.deleteFollow(followId);
        res.json(result + "has been deleted");
    }
    catch {
        res.status(409);
    }
})

export default router