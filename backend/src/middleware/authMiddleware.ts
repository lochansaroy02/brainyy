import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constant";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader?.split(" ")[1];

    try {
        const decoded = jwt.verify(authHeader as string, JWT_SECRET);

        //@ts-ignore
        req.userId = decoded.userId; // Attach userId to req for later use

        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
