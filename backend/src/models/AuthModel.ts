import { model, Schema } from "mongoose";


interface IAuth {
    name: string,
    email: string,
    password: string
}
const authSchema: Schema<IAuth> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});


const Auth = model<IAuth>('Auth', authSchema)

export default Auth;