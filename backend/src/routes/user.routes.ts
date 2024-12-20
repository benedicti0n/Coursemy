import express from "express";
import verifyToken from "../middlewares/login.middleware";
import { fetchProfileDetails, becomeCreator, fetchBoughtCourses, handleEditProfile, deleteAccount, addMoneyToWallet, fetchCreatorDetails } from "../controllers/profile.controller";

const router = express.Router()

router.get("/profile", verifyToken, fetchProfileDetails)
router.post("/profile", verifyToken, becomeCreator)
router.get("/boughtCourses", verifyToken, fetchBoughtCourses)
router.post("/editProfile", verifyToken, handleEditProfile)
router.post("/deleteAccount", verifyToken, deleteAccount)
router.post("/addMoney", verifyToken, addMoneyToWallet)
router.post("/creatorProfile", fetchCreatorDetails)

export default router