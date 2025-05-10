import mongoose, { model, Schema } from "mongoose"






const contentSChema = new Schema({
    link: { type: String, require: true },
    title: { type: String, require: true },
    type: { type: String, require: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Auth", required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }]
})

const Content = model("Content", contentSChema)
export default Content