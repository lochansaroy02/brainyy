"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getContent = exports.createContent = void 0;
const contentModel_1 = __importDefault(require("../models/contentModel"));
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title, desc } = req.body;
    try {
        const content = new contentModel_1.default({
            type, link, title, desc,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        yield content.save();
        return res.status(200).json({
            message: "content created ",
            data: content
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server error" });
    }
});
exports.createContent = createContent;
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield contentModel_1.default.find({
            //@ts-ignore
            userId: req.userId
        }).populate("userId", "name");
        return res.status(200).json({
            data: contents
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error });
    }
});
exports.getContent = getContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: contentId } = req.params;
    try {
        // First find the document and ensure the user is authorized
        const content = yield contentModel_1.default.findOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        if (!content) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }
        yield contentModel_1.default.findByIdAndDelete(contentId);
        res.status(200).json({
            message: "Deleted successfully",
            data: contentId
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : error
        });
    }
});
exports.deleteContent = deleteContent;
//# sourceMappingURL=contentController.js.map