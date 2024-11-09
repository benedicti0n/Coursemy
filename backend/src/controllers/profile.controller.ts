import { Request, Response } from "express"

import User from "../models/user.model"

export const fetchProfileDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req._id
        const response = await User.findById(userId, "profilePicture name username email role coursesBought")

        if (!response) {
            res.status(400).json({ message: "User detaild couldn't be fetched" })
            return
        }

        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Error fetching details" })
    }
}