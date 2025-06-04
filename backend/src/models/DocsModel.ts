import mongoose, { model, Schema } from "mongoose"


const DocsSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Auth", required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }]
})

const Docs = model("Docs", DocsSchema)
export default Docs