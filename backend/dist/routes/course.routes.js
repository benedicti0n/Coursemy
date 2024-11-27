"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const creator_middleware_1 = __importDefault(require("../middlewares/creator.middleware"));
const login_middleware_1 = __importDefault(require("../middlewares/login.middleware"));
const course_controller_1 = require("../controllers/course.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    dest: "/temp/uploads/",
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
router.post("/createCourse", upload.single("bannerPicture"), login_middleware_1.default, creator_middleware_1.default, course_controller_1.createCourse);
router.get("/feed", course_controller_1.getAllCourses);
router.get("/:courseId", course_controller_1.fetchCourseDetails);
router.post("/enroll", login_middleware_1.default, course_controller_1.buyCourse);
exports.default = router;
//# sourceMappingURL=course.routes.js.map