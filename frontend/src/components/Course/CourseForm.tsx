import { useState } from 'react'
import { useForm, useFieldArray } from "react-hook-form"
import axios from 'axios';
import checkToken from '../../util/checkToken';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface courseData {
    name: string;
    description: string;
    price: number;
    content: string[];
}

const CourseForm = () => {
    const { handleSubmit, register, control } = useForm<courseData>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "content" // name of the field array
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [selectedImagePreview, setSelectedImagePreview] = useState<string>("")

    const token = checkToken()

    if (!token) {
        console.error("User is unauthorized");
    }

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price.toString())
        console.log(data.content);

        formData.append("content", JSON.stringify(data.content))

        if (selectedImage) {
            formData.append("bannerPicture", selectedImage)
        }

        try {
            const response = await axios.post(`${serverUrl}/api/v1/course/createCourse`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response);

        } catch (error) {
            console.error(error);

        }



    })

    return (
        <form encType='multipart/form-data' onSubmit={onSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Course</h2>
            <div className="mb-4">
                <input {...register("name")} placeholder='Title' className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
                <input type='file' accept='image/*' onChange={(e) => {
                    if (e.target.files?.[0]) {
                        setSelectedImage(e.target.files[0])
                        setSelectedImagePreview(URL.createObjectURL(e.target.files[0]))
                    }
                }} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            {selectedImagePreview && (
                <div className="mb-4">
                    <img src={selectedImagePreview} alt="Preview" className="w-full h-auto rounded" />
                </div>
            )}
            <div className="mb-4">
                <input {...register("description")} placeholder='Short description' className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
                <input {...register("price")} placeholder='Price' type="number" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Content</label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-2">
                        <input
                            {...register(`content.${index}` as const)}
                            placeholder='Add Content'
                            className="flex-1 p-2 border border-gray-300 rounded"
                        />
                        <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => append('')} className="mt-2 text-blue-500">+ Add Content</button>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
        </form>
    )
}

export default CourseForm