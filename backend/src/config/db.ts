import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({
    path:"../.env"
});
const url = process.env.MONGODB_URI

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(url as any,)
        if (!url) {
            throw new Error("Missing MONGODB_URI in environment variables");
        }
        console.log("Connected to DB");
        console.log(url);

    } catch (error) {
        console.log(error);
        process.exit(1);

    }

}



