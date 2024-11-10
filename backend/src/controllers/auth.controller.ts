import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary";
import User from "../models/user.model";

export const handleSignUp = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const profilePicture = req.file;

        const existingUser = await User.findOne({ email: data.email })

        if (!!existingUser) {
            res.status(409).json({ message: "User already exists. Log in please." })
            return
        }

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

        await user.save()

        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
    }
}

export const handleLogin = async (req: Request, res: Response) => {
    interface IUserDetails {
        _id: string;
        username: string;
        password: string;
    }

    try {
        const { username, password } = req.body;

        const userDetails = await User.findOne({ username }, "_id username password") as IUserDetails | null

        if (!userDetails) {
            console.error('Login attempt with non-existing username:', username);
            res.status(401).json({ error: 'No account found' });
        }

        const passwordMatched = await bcrypt.compare(password, userDetails!.password)

        if (!passwordMatched) {
            res.status(401).json({ message: "Authentication failed" })
        }

        const secretKey: string = process.env.JWT_SECRET_KEY as string;

        const token = jwt.sign({ userId: userDetails!._id }, secretKey, { expiresIn: '1h' })
        console.log(token);

        res.status(200).json({ token })
    }
    catch (error) {
        res.status(500).json({ error: 'Login Failed' })
    }
}