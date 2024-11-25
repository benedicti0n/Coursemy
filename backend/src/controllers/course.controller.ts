import { Request, Response } from "express"
import User from "../models/user.model"
import Course from "../models/course.model"
import cloudinary from "../utils/cloudinary"

export const createCourse = async (req: Request, res: Response) => {
    try {
        const formData = req.body
        const bannerPicture = req.file
        const userId = req._id

        const content: string[] = JSON.parse(formData.content)

        const result = await cloudinary.uploader.upload(bannerPicture!.path)
        const bannerPictureUrl = result.secure_url

        const course = new Course({
            name: formData.name,
            bannerPicture: bannerPictureUrl,
            description: formData.description,
            price: formData.price,
            content: content,
            createdBy: userId,
        })

        console.log(course);

        await course.save()
        console.log("Course created successfully");

        await User.findByIdAndUpdate(userId, {
            $push: {
                coursesCreated: course._id
            }
        })

        res.status(200).json({ message: "Course created successfully" })
    } catch (error) {
        console.error(error);
    }
}

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const allCourses = await Course.find({}, "_id name bannerPicture description price totalSold")

        res.status(200).json(allCourses)
    } catch (error) {
        console.error(error);
    }
}

export const fetchCourseDetails = async (req: Request, res: Response) => {
    const { courseId } = req.params

    try {
        const course = await Course.findById(courseId).populate('createdBy', 'name')

        console.log(course);

        if (!course) {
            res.status(404).json({ message: "Couldn't fetch course details" })
        }

        res.status(200).send(course)
    } catch (error) {
        res.status(500).json({ message: "Internal Server error" })
        console.log("hi");

    }
}