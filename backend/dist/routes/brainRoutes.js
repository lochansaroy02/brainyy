"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brainController_1 = require("../controllers/brainController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/share", authMiddleware_1.userMiddleware, brainController_1.shareBrain);
router.get("/get-brain/:shareLink", brainController_1.getBrain);
exports.default = router;
//# sourceMappingURL=brainRoutes.js.map