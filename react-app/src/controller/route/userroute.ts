import RouterServiceUser from "../../../modelBackend/servicesBackend/routeServiceUser";
import type User from "../../interfaces/User";
import express from "express"

const router = express.Router();
const service = new RouterServiceUser();

router.post("/createUser", async (req, res) => {
    try {
      const userInfo = req.body as User;
      const result = await service.createUser(userInfo)
      res.status(201).json(result);
    } catch {
        res.status(500).json({
        message:"Failed creating user"
        });
    }
})

router.get("/search/:text", async (req, res) => {
    try {
        const results = await service.searchUsers(req.params.text);
        res.json(results);
    } catch {
        res.status(500).json({
            message: "Failed searching users"
        });
    }
});
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

router.get("/getUserByLogin/:email/:password", async (req, res) => {
    try {
        const email = req.params.email;
        const password = req.params.password;
        const user = await service.getUserByLogin(email, password);
        res.json(user);
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