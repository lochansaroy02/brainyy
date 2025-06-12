import { Request, Response } from "express";
import Auth from "../models/AuthModel";
import Content from "../models/contentModel";
import Link from "../models/LinkModel";
import { generateHash } from "../utils";


export const shareBrain = async (req: Request, res: Response): Promise<any> => {
    const { share } = req.body;
    try {
        if (share) {
            const hashString = generateHash(10)

            const existingLink = await Link.findOne({
                //@ts-ignore
                userId: req.userId
            })
            if (existingLink) {
                return res.status(200).json({
                    message: "Brain shared successfully",
                    //@ts-ignore
                    user: req.userId,
                    data: existingLink.hash
                })
            }
            await Link.create({
                //@ts-ignore
                userId: req.userId,
                hash: hashString

            })

            return res.status(200).json({
                message: "Brain shared successfully",
                data: hashString
            })
        } else {
            await Link.deleteOne({
                //@ts-ignore
                userId: req.userId
            })
            return res.status(200).json({
                message: "Brain unshared successfully",
            })
        }


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }

}


export const getBrain = async (req: Request, res: Response): Promise<any> => {
    const { shareLink } = req.params
    try {
        const link = await Link.findOne({ hash: shareLink })
        if (!link) {
            return res.status(404).json({
                message: "Brain not found"
            })
        }

        const content = await Content.find({
            userId: link.userId
        })
        const user = await Auth.find({
            _id: link.userId
        })
        if (!content || !user) {
            return res.status(404).json({
                message: "No content found"
            })
        }



        res.status(200).json({
            //@ts-ignore
            username: user.name,
            content: content
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

