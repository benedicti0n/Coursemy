import express from "express"
import multer from "multer"
import { handleSignUp, handleLogin } from "../controllers/auth.controller"

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post("/signUp", upload.single("profilePicture"), handleSignUp)
router.post("/login", handleLogin)

export default router