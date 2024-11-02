import { Request, Response } from "express";
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary";
import User from "../models/user.model";
export const handleSignUp = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const profilePicture = req.file;

        const saltRounds = 10
        const plainPassword = data.password
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)

        const result = await cloudinary.uploader.upload(profilePicture!.path)

        const user = new User({
            name: data.name,
            username: data.username,
            email: data.email,
            password: hashedPassword,
            profilePicture: result.secure_url,
            role: data.role,
        })
        console.log(user);

        await user.save()

        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
    }
}