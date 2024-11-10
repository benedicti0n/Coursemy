import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

dotenv.config()

interface cloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

// console.log(process.env.CLOUD_NAME);
// console.log(process.env.API_KEY);
// console.log(process.env.API_SECRET);


if (!process.env.CLOUD_NAME || !process.env.API_KEY || process.env.API_SECRET) {
    console.log("Cloudinary Credentials error");
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.API_KEY!,
    api_secret: process.env.API_SECRET!,
} as cloudinaryConfig)

export default cloudinary