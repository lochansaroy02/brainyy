"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const docsController_1 = require("../controllers/docsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.userMiddleware, docsController_1.createDoc);
router.get("/get", authMiddleware_1.userMiddleware, docsController_1.getDocs);
exports.default = router;
//# sourceMappingURL=docRoutes.js.map