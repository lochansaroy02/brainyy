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
exports.getDocs = exports.createDoc = void 0;
const DocsModel_1 = __importDefault(require("../models/DocsModel"));
const createDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, type } = req.body;
        const doc = new DocsModel_1.default({
            title, description, type,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        yield doc.save();
        return res.status(200).json({
            message: "Document Created",
            data: doc
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
});
exports.createDoc = createDoc;
const getDocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield DocsModel_1.default.find({
            //@ts-ignore
            userId: req.userId
        });
        return res.status(200).json({
            data: docs
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error });
    }
});
exports.getDocs = getDocs;
//# sourceMappingURL=docsController.js.map