import { Request, Response } from "express";

export const handleSignUp = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const profilePicture = req.file;

        // console.log('Form data:', data);
        console.log('File:', profilePicture);

        res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during signup' });
    }
}