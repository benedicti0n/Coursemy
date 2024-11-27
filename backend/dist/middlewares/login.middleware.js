"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ error: "Access Denied" });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Invalid token format" });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req._id = decoded.userId;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Access Denied" });
        return;
    }
};
exports.default = verifyToken;
//# sourceMappingURL=login.middleware.js.map