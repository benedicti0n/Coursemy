import { Request, Response } from "express"
import User from "../models/user.model"
import Course from '../models/course.model';

export const fetchProfileDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req._id;

        const user = await User.findById(userId, 'profilePicture name username email role coursesBought coursesCreated')
            .populate({
                path: 'coursesCreated',
                model: Course,
                select: 'name description price bannerPicture totalSold'
            });

        if (!user) {
            res.status(400).json({ message: "User details couldn't be fetched" });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching profile details:', error);
        res.status(500).json({ message: 'Error fetching details' });
    }
};


export const becomeCreator = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req._id

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