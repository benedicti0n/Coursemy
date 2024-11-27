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
exports.handleLogin = exports.handleSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const user_model_1 = __importDefault(require("../models/user.model"));
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const profilePicture = req.file;
        const existingUser = yield user_model_1.default.findOne({ email: data.email });
        if (!!existingUser) {
            res.status(409).json({ message: "User already exists. Log in please." });
            return;
        }
        const saltRounds = 10;
        const plainPassword = data.password;
        const hashedPassword = yield bcrypt_1.default.hash(plainPassword, saltRounds);
        const result = yield cloudinary_1.default.uploader.upload(profilePicture.path);
        const user = new user_model_1.default({
            name: data.name,
            username: data.username,
            email: data.email,
            password: hashedPassword,
            profilePicture: result.secure_url,
            role: data.role,
        });
        yield user.save();
        res.status(200).json({ message: 'Signup successful' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
    }
});
exports.handleSignUp = handleSignUp;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userDetails = yield user_model_1.default.findOne({ username }, "_id username password");
        if (!userDetails) {
            console.error('Login attempt with non-existing username:', username);
            res.status(401).json({ error: 'No account found' });
        }
        const passwordMatched = yield bcrypt_1.default.compare(password, userDetails.password);
        if (!passwordMatched) {
            res.status(401).json({ message: "Authentication failed" });
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ userId: userDetails._id }, secretKey, { expiresIn: '1h' });
        console.log(token);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Login Failed' });
    }
});
exports.handleLogin = handleLogin;
//# sourceMappingURL=auth.controller.js.map