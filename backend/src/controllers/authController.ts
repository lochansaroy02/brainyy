import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constant';
import Auth from "../models/AuthModel";

interface SignUpBody {
    name: string,
    email: string,
    password: string
}


export const signup = async (req: Request<{}, {}, SignUpBody>, res: Response) => {

    const { name, email, password } = req.body;
    try {


        if (!name || !email || !password) {
            res.status(411).json({
                message: "please enter the fields"
            })
        }
        const userExist = await Auth.findOne({
            email
        })


        if (userExist) {
            res.status(403).json({
                error: "User already exist please login"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new Auth({
            name, email, password: hashedPassword
        })
        await user.save()

        res.status(201).json({
            message: "User created successfully",
        });


    } catch (error) {
        console.log(error)
    }


}


interface SignInBody {
    email: string,
    password: string
}

export const login = async (req: Request<{}, {}, SignInBody>, res: Response): Promise<any> => {

    const { email, password } = req.body;
    try {
        const user = await Auth.findOne({ email }).select("+password");

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user?.password)
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'incorrect password'
                })
            }
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: "1d" }
            );


            return res.status(201).json({
                message: "Login successful",
                token: token
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error', error: error });

    }
}


export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await Auth.find()
        return res.status(200).json({ data: users })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error })
    }
}

