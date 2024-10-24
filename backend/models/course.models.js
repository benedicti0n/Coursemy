import mongoose from 'mongoose'
const { Schema } = mongoose

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        index: true
    },
    courseBanner: {
        type: String
    },
    courseDescription: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        default: "0"
    },
    courseContent: {
        type: String,
        required: true
    },
    totalSold: {
        type: Number
    }
}, { timestamps: true })

export const Course = mongoose.model("course", courseSchema)