import { Request, Response } from "express";
import Content from "../models/contentModel";




interface ITag {
    tag: string
}
interface IContent {
    type: string,
    link: string,
    title: string,
    tags: Array<ITag>
}


export const createContent = async (req: Request<{}, {}, IContent>, res: Response): Promise<any> => {
    const { type, link, title } = req.body;

    try {

        const content = new Content({
            type, link, title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })
        await content.save()
        return res.status(200).json({
            message: "content created ",
            data: content
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" })
    }
}


export const getContent = async (req: Request, res: Response): Promise<any> => {
    try {
        const contents = await Content.find({
            //@ts-ignore
            userId: req.userId
        }).populate("userId", "name");
        return res.status(200).json({
            data: contents
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error })
    }
}


export const deleteContent = async (req: Request, res: Response): Promise<any> => {
    const { id: contentId } = req.params;
    try {
        // First find the document and ensure the user is authorized
        const content = await Content.findOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });

        if (!content) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }

        await Content.findByIdAndDelete(contentId);

        res.status(200).json({
            message: "Deleted successfully",
            data: contentId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : error
        });
    }
}


