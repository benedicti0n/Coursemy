import { Router } from "express"
import multer from "multer"
import fs from "fs"
import isCreator from "../middlewares/creator.middleware"
import verifyToken from "../middlewares/login.middleware"
import { createCourse, getAllCourses, fetchCourseDetails, buyCourse } from "../controllers/course.controller"

const router = Router()
const uploadPath = '/tmp/uploads';

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const upload = multer({
    dest: uploadPath,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

router.post("/createCourse", upload.single("bannerPicture"), verifyToken, isCreator, createCourse)
router.get("/feed", getAllCourses)
router.get("/:courseId", fetchCourseDetails)
router.post("/enroll", verifyToken, buyCourse)

export default router