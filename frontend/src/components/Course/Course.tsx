import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface ICourseDetails {
    name: string;
    bannerPicture: string;
    description: string;
    price: number;
    createdBy: {
        userId: string;
        name: string;
        _id: string;
    };
    content: string[];
    totalSold: number;
}

const Course: React.FC = () => {
    const [courseDetails, setCourseDetails] = useState<ICourseDetails | null>(null)
    const { courseId } = useParams()

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/course/${courseId}`)
                const data = response.data

                setCourseDetails(data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchCourseDetails()

    }, [])
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <img src={courseDetails?.bannerPicture} alt={courseDetails?.name} className="w-full h-64 object-cover rounded-md mb-6" />
            <h1 className="text-4xl font-semibold mb-2">{courseDetails?.name}</h1>
            <p className="text-gray-600 mb-4">{courseDetails?.description}</p>
            <p className="text-lg font-semibold mb-4">Price: ${courseDetails?.price}</p>
            <p className="text-gray-500 mb-4">Created By: {courseDetails?.createdBy.name}</p>
            <p className="text-gray-500 mb-6">Total Sold: {courseDetails?.totalSold}</p>
            <h2 className="text-2xl font-semibold mb-4">Content</h2>
            <ul className="list-disc ml-8">
                {courseDetails?.content.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Course;
