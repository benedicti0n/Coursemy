import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import connectDB from "./db/connectDb"

import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import courseRoutes from "./routes/course.routes"

dotenv.config()

const app: Express = express()
const PORT: string | number = process.env.PORT as string | number

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://coursemy-phi.vercel.app'
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
        ? 'https://coursemy-phi.vercel.app'
        : 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/course", courseRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})