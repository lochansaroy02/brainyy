import express from "express";
import { getBrain, shareBrain } from "../controllers/brainController";
import { userMiddleware } from "../middleware/authMiddleware";
const router = express.Router();





router.post("/share", userMiddleware, shareBrain);
router.get("/get-brain/:shareLink", getBrain)


export default router