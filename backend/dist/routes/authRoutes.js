"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
router.post("/signup", authController_1.signup);
router.post("/login", authController_1.login);
router.get("/users", authController_1.getUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map