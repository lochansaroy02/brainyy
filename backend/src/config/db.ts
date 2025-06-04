import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();


export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string,)
        console.log("connectToMongoDB");

    } catch (error) {
        console.log(error);
        process.exit(1);

    }

}



