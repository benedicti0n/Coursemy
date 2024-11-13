import mongoose, { Schema, Types } from "mongoose"
import { stringify } from "querystring";

interface Creator {
    userId: Types.ObjectId;
    name: string;
}
interface Course {
    name: string;
    bannerPicture?: string;
    description?: string;
    price: number;
    createdBy: Course[];
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
        required: true,
        min: 0
    },
    createdBy: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        }
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