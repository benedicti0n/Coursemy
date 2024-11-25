import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface ICourseDetails {
    _id: string;
    name: string;
    bannerPicture: string;
    description: string;
    price: number;
    createdBy: {
        _id: string;
        name: string;
    };
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
                const data: ICourseDetails = response.data;
                console.log(data);

                setCourseDetails(data);
                console.log("this is courseDetails: " + courseDetails);

            } catch (error) {
                console.error(error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    return (
        <div className='min-h-screen bg-white'>
            {courseDetails ? (
                <div className="min-h-screen bg-white">
                    {/* Banner Section */}
                    < div className="relative w-full h-96 bg-gray-100" >
                        <img
                            src={courseDetails.bannerPicture}
                            alt={courseDetails.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="max-w-5xl mx-auto">
                                <h1 className="text-5xl font-extrabold mb-4">{courseDetails.name}</h1>
                                <div className="flex items-center space-x-4">
                                    <span className="text-lg">By {courseDetails?.createdBy.name}</span>
                                    <span className="text-lg">•</span>
                                    <span className="text-lg">{courseDetails?.totalSold} students enrolled</span>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* Main Content */}
                    < div className="max-w-5xl mx-auto px-4 py-12" >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Course Details */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Description */}
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-black mb-4">About this course</h2>
                                    <p className="text-gray-700 leading-relaxed">{courseDetails.description}</p>
                                </div>

                                {/* Content Section */}
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    <h2 className="text-2xl font-bold text-black mb-6">Course Content</h2>
                                    {courseDetails.content.length > 0 ? (
                                        <ul className="space-y-3">
                                            {courseDetails?.content.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No content available</p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Purchase Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                                    <div className="text-3xl font-bold text-black mb-6">
                                        ${courseDetails?.price}
                                    </div>
                                    <button className="w-full px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
                                        Enroll Now
                                    </button>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-black mb-4">What you'll get:</h3>
                                        <ul className="space-y-3 text-gray-600">
                                            <li className="flex items-center">
                                                <span className="mr-2">•</span>
                                                Full lifetime access
                                            </li>
                                            <li className="flex items-center">
                                                <span className="mr-2">•</span>
                                                Access on mobile and desktop
                                            </li>
                                            <li className="flex items-center">
                                                <span className="mr-2">•</span>
                                                Certificate of completion
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            ) : (
                <div>
                    <h1>Error fetching the Course Details</h1>
                </div >
            )}

        </div>

    );
};

export default Course;
