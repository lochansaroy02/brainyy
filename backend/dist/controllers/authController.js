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
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../config/constant");
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(411).json({
                message: "please enter the fields"
            });
        }
        const userExist = yield AuthModel_1.default.findOne({
            email
        });
        if (userExist) {
            res.status(403).json({
                error: "User already exist please login"
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new AuthModel_1.default({
            name, email, password: hashedPassword
        });
        yield user.save();
        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield AuthModel_1.default.findOne({ email }).select("+password");
        if (user) {
            const passwordMatch = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'incorrect password'
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, constant_1.JWT_SECRET, { expiresIn: "1d" });
            return res.status(201).json({
                message: "Login successful",
                token: token
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'internal server error', error: error });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map