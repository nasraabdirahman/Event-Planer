import RouterServiceUser from "../../../modelBackend/servicesBackend/routeServiceUser";
import type User from "../../interfaces/User";
import express from "express"

const router = express.Router();
const service = new RouterServiceUser();

router.post("/createUser", async (req, res) => {
    try {
        const userInfo = req.body as User;
        const result = service.createUser(userInfo)
        res.json(result);
    }
    catch {
        res.status(409);
    }
})

router.get("/getUser/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const result = await service.getUser(userId)

        res.json(result);
    }
    catch  {
        res.status(404)
    }
})

router.get("/getUserByLogin", async (req, res) => {
    try {
        const email = req.body
        const password = req.body
        return service.getUserByLogin(email, password);
    }
    catch  {
        res.status(404);
    }
})

router.get("/getAllUser", async (_req, res) => {
    try {
        return service.getAllUser();
    }
    catch  {
        res.status(409)
    }
})

router.delete("/deleteUser/:id", async (req, res) => {
    try {
        const userId = req.params.id
        const result = service.deleteUser(userId);
        res.json(result + "has been deleted");
    }
    catch {
        res.status(409);
    }
})

export default router