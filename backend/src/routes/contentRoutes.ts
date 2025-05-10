import express from "express";
import { createContent, deleteContent, getContent } from "../controllers/contentController";
import { userMiddleware } from "../middleware/authMiddleware";
const router = express.Router();





router.post("/create", userMiddleware, createContent);
router.get("/fetch", userMiddleware, getContent);
router.delete("/delete/:id", userMiddleware, deleteContent)



export default router