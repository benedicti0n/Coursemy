import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'Coursemy',
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};
