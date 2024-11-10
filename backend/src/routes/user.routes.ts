import express from "express";
import { verifyToken } from "../middlewares/login.middleware";
import { fetchProfileDetails, becomeCreator } from "../controllers/profile.controller";

const router = express.Router()

router.get("/profile", verifyToken, fetchProfileDetails)
router.post("/profile", verifyToken, becomeCreator)

export default router