import mongoose, { Schema, Types } from "mongoose"

import Course from "./course.model.ts"

interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    role: "creator" | "learner";
    coursesBought: Types.ObjectId[] | Course[];
    coursesCreated: Types.ObjectId[] | Course[]
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    role: {
        type: String,
        enum: ["creator", "learner"],
        default: "learner",
        required: true
    },
    coursesBought: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    coursesCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true })

const User = mongoose.model<User>('user', userSchema)

export default User