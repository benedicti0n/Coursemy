import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import checkToken from '../../util/checkToken';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

interface courseData {
    name: string;
    description: string;
    price: number;
    content: string[];
}

const CourseForm = () => {
    const { handleSubmit, register, control } = useForm<courseData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'content'
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState<string>('');

    const token = checkToken();

    if (!token) {
        console.error('User is unauthorized');
    }

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('content', JSON.stringify(data.content));

        if (selectedImage) {
            formData.append('bannerPicture', selectedImage);
        }

        try {
            const response = await axios.post(`${serverUrl}/api/v1/course/createCourse`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <form
            encType="multipart/form-data"
            onSubmit={onSubmit}
            className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Create a New Course</h2>

            {/* Course Title */}
            <div className="mb-6">
                <input
                    {...register('name')}
                    placeholder="Course Title"
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setSelectedImage(e.target.files[0]);
                            setSelectedImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                    }}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                />
            </div>

            {/* Image Preview */}
            {selectedImagePreview && (
                <div className="mb-6">
                    <img
                        src={selectedImagePreview}
                        alt="Preview"
                        className="w-full h-52 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}

            {/* Course Description */}
            <div className="mb-6">
                <textarea
                    {...register('description')}
                    placeholder="Course Description"
                    rows={3}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Course Price */}
            <div className="mb-6">
                <input
                    {...register('price')}
                    placeholder="Price"
                    type="number"
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Course Content */}
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Course Content</label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-3">
                        <input
                            {...register(`content.${index}` as const)}
                            placeholder={`Content #${index + 1}`}
                            className="flex-1 p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-3 text-gray-400 hover:text-red-500 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append('')}
                    className="mt-3 text-blue-600 hover:text-blue-800 transition"
                >
                    + Add More Content
                </button>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Submit Course
            </button>
        </form>
    );
};

export default CourseForm;
