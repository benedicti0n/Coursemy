import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import cron from "node-cron"
import axios from "axios"
import connectDB from "./db/connectDb";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";

dotenv.config();

const app: Express = express();
const PORT: string | unknown = process.env.PORT

// Use CORS middleware once
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

cron.schedule('*/10 * * * *', async () => {
    console.log('Render please stay alive');
    try {
        await axios.get(process.env.CLIENT_URL || "http://localhost:5173/");
    } catch (error) {
        console.error('Error keeping server awake:', error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
