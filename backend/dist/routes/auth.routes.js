"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post("/signUp", upload.single("profilePicture"), auth_controller_1.handleSignUp);
router.post("/login", auth_controller_1.handleLogin);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map