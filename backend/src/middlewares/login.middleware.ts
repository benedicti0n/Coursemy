import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

declare module 'express' {
    interface Request {
        _id?: string;
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        res.status(401).json({ error: "Access Denied" });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Invalid token format" });
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const decoded = jwt.verify(token, secretKey) as { userId: string };

        req._id = decoded.userId;

        next();
    } catch (error) {
        res.status(500).json({ message: "Access Denied" });
        return;
    }
};
