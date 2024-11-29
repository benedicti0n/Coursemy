import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

dotenv.config()

interface cloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

const cloudName = process.env.CLOUD_NAME as string
const apiKey = process.env.API_KEY as string
const apiSecret = process.env.API_SECRET as string


if (!cloudName || !apiKey || !apiSecret) {
    console.log("Cloudinary Credentials error");
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
} as cloudinaryConfig)

export default cloudinary