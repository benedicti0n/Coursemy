"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_middleware_1 = __importDefault(require("../middlewares/login.middleware"));
const profile_controller_1 = require("../controllers/profile.controller");
const router = express_1.default.Router();
router.get("/profile", login_middleware_1.default, profile_controller_1.fetchProfileDetails);
router.post("/profile", login_middleware_1.default, profile_controller_1.becomeCreator);
router.get("/boughtCourses", login_middleware_1.default, profile_controller_1.fetchBoughtCourses);
router.post("/editProfile", login_middleware_1.default, profile_controller_1.handleEditProfile);
router.post("/deleteAccount", login_middleware_1.default, profile_controller_1.deleteAccount);
router.post("/addMoney", login_middleware_1.default, profile_controller_1.addMoneyToWallet);
exports.default = router;
//# sourceMappingURL=user.routes.js.map