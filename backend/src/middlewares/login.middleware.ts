import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { decode } from "punycode"

export const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ error: "Access Denied" })
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY as string
        const decoded = jwt.verify(token, secretKey) as { username: string }

        req.username = decoded.username
        next()
    } catch (error) {
        res.status(500).json({ message: "Access Denied" })
    }
}