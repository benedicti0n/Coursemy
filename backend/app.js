import 'dotenv/config'

import express from "express" //ES6 syntax - import statement
import bcrypt from "bcrypt"
import { connectDB } from './db/connectDB.js'
import { User } from './models/user.models.js'
import cors from "cors"

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(cors())

app.post('/api/signup', (req, res) => {
    try {
        const { name, email, username, password, profilePicture } = req.body
        const existingUser = User.findOne({ $or: [{ userEmail: email }, { userUsername: username }] })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hash(password, salt)
        console.log(hashedPassword)

    } catch (error) {

    }
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})