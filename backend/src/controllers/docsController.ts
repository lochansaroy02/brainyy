import { Request, Response } from "express";
import Docs from "../models/DocsModel";

interface ITag {
    tag: string
}

interface IDoc {
    title: string,
    description: string,
    type: string,
    tags: Array<ITag>
}


export const createDoc = async (req: Request<{}, {}, IDoc>, res: Response): Promise<any> => {
    try {
        const { title, description, type } = req.body;
        const doc = new Docs({
            title, description, type,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })
        await doc.save();
        return res.status(200).json({
            message: "Document Created",
            data: doc
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error })
    }
}



export const getDocs = async (req: Request, res: Response): Promise<any> => {
    try {
        const docs = await Docs.find({
            //@ts-ignore
            userId: req.userId
        });
        return res.status(200).json({
            data: docs
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error })
    }
}
