import mongoose, { Schema, Types } from "mongoose"
import User from "./user.model";

interface Course {
    name: string;
    bannerPicture: string;
    description: string;
    price: number;
    createdBy: Types.ObjectId[] | User[];
    content: string[];
    totalSold: number;
}

const courseSchema = new Schema<Course>({
    name: {
        type: String,
        required: true
    },
    bannerPicture: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    content: [{
        type: String
    }],
    totalSold: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Course = mongoose.model<Course>('course', courseSchema)

export default Course