"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const Auth = (0, mongoose_1.model)('Auth', authSchema);
exports.default = Auth;
//# sourceMappingURL=AuthModel.js.map