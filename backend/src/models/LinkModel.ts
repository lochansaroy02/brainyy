import mongoose, { model, Schema } from "mongoose";


const linkSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    hash: String,
});


const Link = model('Link', linkSchema)

export default Link;