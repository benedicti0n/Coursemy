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

export const becomeCreator = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req._id
        console.log(userId);

        const response = await User.findByIdAndUpdate(userId, { role: "creator" })

        if (!response) {
            res.status(409).json({ mesage: "Error changing role" })
            return
        }

        res.status(200).json({ message: "Role changes to creator." })
    } catch (error) {
        res.status(500).json({ message: "Error changing the data" })
    }
}