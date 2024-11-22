import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import checkToken from '../../util/checkToken';
import Button from '../../ui/Button';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

interface CourseData {
    name: string;
    description: string;
    price: number;
    content: string[];
}

const CourseForm = () => {
    const { handleSubmit, register, control } = useForm<CourseData>();
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
            className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
        >
            <h2 className="text-3xl font-semibold text-gray-800 text-center">Create a New Course</h2>

            {/* Course Title */}
            <div className="mb-4">
                <input
                    {...register('name')}
                    placeholder="Course Title"
                    className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setSelectedImage(e.target.files[0]);
                            setSelectedImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                    }}
                    className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                />
            </div>

            {/* Image Preview */}
            {selectedImagePreview && (
                <div className="mb-6">
                    <img
                        src={selectedImagePreview}
                        alt="Preview"
                        className="w-full h-56 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}

            {/* Course Description */}
            <div className="mb-4">
                <textarea
                    {...register('description')}
                    placeholder="Course Description"
                    rows={4}
                    className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Course Price */}
            <div className="mb-4">
                <input
                    {...register('price')}
                    placeholder="Price"
                    type="number"
                    className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Course Content */}
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">Course Content</label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-3 space-x-4">
                        <input
                            {...register(`content.${index}` as const)}
                            placeholder={`Content #${index + 1}`}
                            className="flex-1 p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append('')}
                    className="text-gray-500 hover:text-black mt-2 transition"
                >
                    + Add More Content
                </button>
            </div>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
                Submit Course
            </Button>
        </form>
    );
};

export default CourseForm;
