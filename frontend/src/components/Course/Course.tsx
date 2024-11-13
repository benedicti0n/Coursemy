import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface ICourseDetails {
    name: string;
    bannerPicture: string;
    description: string;
    price: number;
    createdBy: [{
        userId: string;
        name: string;
        _id: string;
    }];
    content: string[];
    totalSold: number;
}

const Course: React.FC = () => {
    const [courseDetails, setCourseDetails] = useState<ICourseDetails | null>(null);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/course/${courseId}`);
                const data = response.data;
                setCourseDetails(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Banner Section */}
            <div className="relative max-w-3xl mx-auto h-64 rounded-lg overflow-hidden shadow-md mb-10">
                <img
                    src={courseDetails?.bannerPicture}
                    alt={courseDetails?.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Course Information Section */}
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {/* Description and Creator Info */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{courseDetails?.name}</h2>
                        <p className="text-gray-700 mb-6">{courseDetails?.description}</p>
                        <p className="text-xl font-medium text-blue-700">Price: ${courseDetails?.price}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="border-l-4 border-blue-300 pl-6">
                            <p className="text-gray-600 text-base">Creator:</p>
                            <h3 className="text-lg font-semibold text-gray-800">{courseDetails?.createdBy[0].name}</h3>
                            <p className="text-gray-500 mt-3">Total Sold: <span className="font-medium text-gray-700">{courseDetails?.totalSold}</span></p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Course Content</h3>
                    {courseDetails?.content.length > 0 ? (
                        <ul className="space-y-3">
                            {courseDetails?.content.map((item, index) => (
                                <li
                                    key={index}
                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-150"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No content available</p>
                    )}
                </div>

                {/* Purchase Button */}
                <div className="mt-10 flex justify-center">
                    <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition duration-200">
                        Buy Now for ${courseDetails?.price}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Course;
