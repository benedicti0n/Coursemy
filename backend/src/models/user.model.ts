import mongoose, { Schema, Types } from "mongoose"

interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    role: "creator" | "learner";
    wallet: number;
    coursesBought?: Types.ObjectId[];
    coursesCreated?: Types.ObjectId[];
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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
    wallet: {
        type: Number,
        default: 0
    },
    coursesBought: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
    coursesCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }]
}, { timestamps: true })

const User = mongoose.model<User>('user', userSchema)

export default User