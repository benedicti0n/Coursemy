import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./db/connectDb";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT;

// Use CORS middleware once
app.use(
    cors({
        origin: process.env.NODE_ENV === 'production'
            ? 'https://coursemy-phi.vercel.app' // Frontend URL
            : 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
