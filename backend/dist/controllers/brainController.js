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
exports.getBrain = exports.shareBrain = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const contentModel_1 = __importDefault(require("../models/contentModel"));
const LinkModel_1 = __importDefault(require("../models/LinkModel"));
const utils_1 = require("../utils");
const shareBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    try {
        if (share) {
            const hashString = (0, utils_1.generateHash)(10);
            const existingLink = yield LinkModel_1.default.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (existingLink) {
                return res.status(200).json({
                    message: "Brain shared successfully",
                    //@ts-ignore
                    user: req.userId,
                    data: existingLink.hash
                });
            }
            yield LinkModel_1.default.create({
                //@ts-ignore
                userId: req.userId,
                hash: hashString
            });
            return res.status(200).json({
                message: "Brain shared successfully",
                data: hashString
            });
        }
        else {
            yield LinkModel_1.default.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            return res.status(200).json({
                message: "Brain unshared successfully",
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.shareBrain = shareBrain;
const getBrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shareLink } = req.params;
    try {
        const link = yield LinkModel_1.default.findOne({ hash: shareLink });
        if (!link) {
            return res.status(404).json({
                message: "Brain not found"
            });
        }
        const content = yield contentModel_1.default.find({
            userId: link.userId
        });
        const user = yield AuthModel_1.default.find({
            _id: link.userId
        });
        if (!content || !user) {
            return res.status(404).json({
                message: "No content found"
            });
        }
        res.status(200).json({
            //@ts-ignore
            username: user.name,
            content: content
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getBrain = getBrain;
//# sourceMappingURL=brainController.js.map