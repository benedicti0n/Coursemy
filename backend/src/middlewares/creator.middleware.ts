import { Request, Response, NextFunction } from "express"
import User from "../models/user.model"

const isCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req._id

        const userRole = await User.findById(userId, "role")

        if (userRole?.role !== "creator") {
            res.status(409).json({ message: "User is not creator" })
            return
        }

        next()
    } catch (error) {
        console.error(error);
    }
}

export default isCreator