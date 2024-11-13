import { Request, Response } from "express"
import User from "../models/user.model"
import Course from "../models/course.model"
import cloudinary from "../utils/cloudinary"

export const createCourse = async (req: Request, res: Response) => {
    try {
        const formData = req.body
        const bannerPicture = req.file
        const userId = req._id

        const data = await User.findById(userId, "name")

        const result = await cloudinary.uploader.upload(bannerPicture!.path)
        const bannerPictureUrl = result.secure_url

        const course = new Course({
            name: formData.name,
            bannerPicture: bannerPictureUrl,
            description: formData.description,
            price: formData.price,
            content: formData.content,
            createdBy: {
                userId,
                name: data?.name
            }
        })

        console.log(course);

        await course.save()

        console.log("Course created successfully");

        res.status(200).json({ message: "Course created successfully" })
    } catch (error) {
        console.error(error);
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const allCourses = await Course.find({}, "_id bannerPicture name createdBy totalSold price")

        res.status(200).json(allCourses)
    } catch (error) {
        console.error(error);
    }
}
