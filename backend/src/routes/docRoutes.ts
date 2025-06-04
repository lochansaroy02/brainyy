import express from "express";
import { createDoc, getDocs } from "../controllers/docsController";
import { userMiddleware } from "../middleware/authMiddleware";
const router = express.Router();





router.post("/create", userMiddleware, createDoc);
router.get("/get", userMiddleware, getDocs);




export default router