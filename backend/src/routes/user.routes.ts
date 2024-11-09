import express from "express";
import { verifyToken } from "../middlewares/login.middleware";
import { fetchProfileDetails } from "../controllers/profile.controller";

const router = express.Router()

router.get("/profile", verifyToken, fetchProfileDetails)

export default router