import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"

const serverUrl: string = import.meta.env.SERVER_URL as string || "http://localhost:8080"

interface FormData {
    name: string;
    username: string;
    email: string;
    password: string;
    role: "learner" | "creator";
}

const SignUpForm = () => {
    const { handleSubmit, register } = useForm<FormData>()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [selectedImagePreview, setselectedImagePreview] = useState<string>("")

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("role", data.role)
        if (selectedImage) {
            formData.append("profilePicture", selectedImage)
        }

        console.log(formData);


        axios.post(`${serverUrl}/api/v1/user/signUp`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
    })

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-4">
                <input
                    {...register("name")}
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    {...register("username")}
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    {...register("email")}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Profile Picture Upload */}
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setSelectedImage(e.target.files[0])
                                setselectedImagePreview(URL.createObjectURL(e.target.files[0]))
                            }
                        }}
                        className="hidden"
                        id="profilePicture"
                    />
                    <label
                        htmlFor="profilePicture"
                        className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                        {selectedImage ? (
                            <img src={selectedImagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                        ) : (
                            <>
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="mt-2 text-sm text-gray-500">Upload Profile Picture</span>
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
                                className="form-radio text-blue-500 focus:ring-blue-500"
                            />
                            <span>Learner</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                {...register("role")}
                                value="creator"
                                className="form-radio text-blue-500 focus:ring-blue-500"
                            />
                            <span>Creator</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Sign Up
                </button>
            </div>
        </form>
    )
}

export default SignUpForm