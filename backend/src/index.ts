import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"

dotenv.config()

const app: Express = express()
const PORT: string | number = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})