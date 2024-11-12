import { Request, Response } from "express"
import Course from "../models/course.model"
import cloudinary from "../utils/cloudinary"

export const createCourse = async (req: Request, res: Response) => {
    try {
        const formData = req.body
        const bannerPicture = req.file
        const userId = req._id

        const result = await cloudinary.uploader.upload(bannerPicture!.path)
        const bannerPictureUrl = result.secure_url

        const course = new Course({
            name: formData.name,
            bannerPicture: bannerPictureUrl,
            description: formData.description,
            price: formData.price,
            content: formData.content,
            createdBy: userId
        })

        await course.save()

        console.log("Course created successfully");

        res.status(200).json({ message: "Course created successfully" })
    } catch (error) {
        console.error(error);
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}
