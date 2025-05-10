import express from "express";
const router = express.Router();


import { login, signup } from "../controllers/authController";



router.post("/signup", signup);
router.post("/login", login)



export default router