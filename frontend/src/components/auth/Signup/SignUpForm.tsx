import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";

const serverUrl: string = import.meta.env.SERVER_URL as string;

interface FormData {
    name: string;
    username: string;
    email: string;
    password: string;
    role: "learner" | "creator";
}

const SignUpForm: React.FC = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState<string>("");

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);
        if (selectedImage) {
            formData.append("profilePicture", selectedImage);
        }

        try {
            await axios.post(`${serverUrl}/api/v1/auth/signUp`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/login");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                console.error("User already exists:", error.response.data.message);
                navigate("/login");
            } else {
                console.error("Signup failed:", error);
            }
        }
    });

    return (
        <form
            encType="multipart/form-data"
            onSubmit={onSubmit}
            className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
        >
            <div className="space-y-4 flex flex-col items-center">
                {/* Text Inputs */}
                <input
                    {...register("name")}
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    {...register("username")}
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    {...register("email")}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Profile Picture Upload */}
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setSelectedImage(e.target.files[0]);
                                setSelectedImagePreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                        className="hidden"
                        id="profilePicture"
                    />
                    <label
                        htmlFor="profilePicture"
                        className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        ) : (
                            <>
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                <span className="mt-2 text-sm text-gray-500">
                                    Upload Profile Picture
                                </span>
                            </>
                        )}
                    </label>
                </div>

                {/* Radio Buttons for Role */}
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">Select your role:</p>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                {...register("role")}
                                value="learner"
                                className="form-radio text-black focus:ring-black"
                            />
                            <span>Learner</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                {...register("role")}
                                value="creator"
                                className="form-radio text-black focus:ring-black"
                            />
                            <span>Creator</span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="secondary"
                >
                    Sign Up
                </Button>
            </div>
        </form>
    );
};

export default SignUpForm;
