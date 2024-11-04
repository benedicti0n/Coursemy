import React from 'react';

interface CourseProps {
    name: string;
    bannerPicture: string;
    description: string;
    price: number;
    createdBy: string;
    content: string[];
    totalSold: number;
}

const Course: React.FC<CourseProps> = ({
    name,
    bannerPicture,
    description,
    price,
    createdBy,
    content,
    totalSold,
}) => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <img src={bannerPicture} alt={name} className="w-full h-64 object-cover rounded-md mb-6" />
            <h1 className="text-4xl font-semibold mb-2">{name}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-lg font-semibold mb-4">Price: ${price}</p>
            <p className="text-gray-500 mb-4">Created By: {createdBy}</p>
            <p className="text-gray-500 mb-6">Total Sold: {totalSold}</p>
            <h2 className="text-2xl font-semibold mb-4">Content</h2>
            <ul className="list-disc ml-8">
                {content.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default Course;
