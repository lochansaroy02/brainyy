import express from "express";
import PrettyError from 'pretty-error';

import cors from "cors";
import { connectToMongoDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import brainRoutes from "./routes/brainRoutes";
import contentRoutes from "./routes/contentRoutes";
import docRoutes from "./routes/docRoutes"


const app = express()
const port = 5000
app.use(express.json())
const pe = new PrettyError();


app.use(cors())

connectToMongoDB();
process.on('uncaughtException', (error) => {
    console.log(pe.render(error));
});






app.use("/auth", authRoutes)
app.use("/content", contentRoutes)
app.use("/brain", brainRoutes)
app.use("/docs", docRoutes)




app.listen(port, () => {
    console.log(`application running on port ${port}`);

})
