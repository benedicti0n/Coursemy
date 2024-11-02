import mongoose from "mongoose";

const connectDB = async () => {
    const MONGODB_URI: string = process.env.MONGODB_URI as string

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(MONGODB_URI)
        console.log("DB connection successful!!");
    } catch (error) {
        console.error(error)
    }
}

export default connectDB