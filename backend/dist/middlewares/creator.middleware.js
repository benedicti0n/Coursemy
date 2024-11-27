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
const user_model_1 = __importDefault(require("../models/user.model"));
const isCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req._id;
        const userRole = yield user_model_1.default.findById(userId, "role");
        if ((userRole === null || userRole === void 0 ? void 0 : userRole.role) !== "creator") {
            res.status(409).json({ message: "User is not creator" });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = isCreator;
//# sourceMappingURL=creator.middleware.js.map