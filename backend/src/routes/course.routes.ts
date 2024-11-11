import { Router } from "express"
import multer from "multer"
import isCreator from "../middlewares/creator.middleware"
import { verifyToken } from "../middlewares/login.middleware"
import createCourse from "../controllers/newCourse.controller"

const router = Router()
const upload = multer({ dest: "uploads/" })

router.post("/createCourse", upload.single("bannerPicture"), verifyToken, isCreator, createCourse)

export default router