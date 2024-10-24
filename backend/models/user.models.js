import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userUsername: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userProfilePicture: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'creator'], // Specifies possible roles
        default: 'user', // Default role is 'user'
        required: true
    },
    userCoursesBought: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    creatorCourses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)