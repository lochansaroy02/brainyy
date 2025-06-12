"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pretty_error_1 = __importDefault(require("pretty-error"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const brainRoutes_1 = __importDefault(require("./routes/brainRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const docRoutes_1 = __importDefault(require("./routes/docRoutes"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
const pe = new pretty_error_1.default();
app.use((0, cors_1.default)());
(0, db_1.connectToMongoDB)();
process.on('uncaughtException', (error) => {
    console.log(pe.render(error));
});
app.use("/auth", authRoutes_1.default);
app.use("/content", contentRoutes_1.default);
app.use("/brain", brainRoutes_1.default);
app.use("/docs", docRoutes_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
app.listen(port, () => {
    console.log(`application running on port ${port}`);
});
//# sourceMappingURL=index.js.map