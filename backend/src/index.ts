import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import connectDB from "./db/connectDb"

dotenv.config()

const app: Express = express()
const PORT: string | number = process.env.PORT as string | number

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.get("/", (req: Request, res: Response) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})