"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = void 0;
const generateHash = (len) => {
    let options = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let optionLength = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * optionLength);
        ans += options[randomIndex];
    }
    return ans;
};
exports.generateHash = generateHash;
//# sourceMappingURL=utils.js.map