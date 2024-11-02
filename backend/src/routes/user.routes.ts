import express from "express"
import multer from "multer"
import { handleSignUp } from "../controllers/user.controller"

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post("/signUp", upload.single("profilePicture"), handleSignUp)

export default router