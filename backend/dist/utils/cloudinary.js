"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log(process.env.CLOUD_NAME);
// console.log(process.env.API_KEY);
// console.log(process.env.API_SECRET);
if (!process.env.CLOUD_NAME || !process.env.API_KEY || process.env.API_SECRET) {
    console.log("Cloudinary Credentials error");
}
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map