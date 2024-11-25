import express from "express";
import verifyToken from "../middlewares/login.middleware";
import { fetchProfileDetails, becomeCreator, fetchBoughtCourses } from "../controllers/profile.controller";

const router = express.Router()

router.get("/profile", verifyToken, fetchProfileDetails)
router.post("/profile", verifyToken, becomeCreator)
router.get("/boughtCourses", verifyToken, fetchBoughtCourses)

export default router