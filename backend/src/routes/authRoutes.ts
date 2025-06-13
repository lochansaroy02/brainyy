import express from "express";
const router = express.Router();


import { getUser, login, signup } from "../controllers/authController";



router.post("/signup", signup);
router.post("/login", login)
router.get("/users", getUser)



export default router