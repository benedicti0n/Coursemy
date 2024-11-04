import React from 'react';

interface ProfileProps {
    profilePicture: string;
    name: string;
    username: string;
    email: string;
    role: string;
    coursesBought: string[];
}

const Profile: React.FC<ProfileProps> = ({
    profilePicture,
    name,
    username,
    email,
    role,
    coursesBought,
}) => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center mb-6">
                <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mr-6" />
                <div>
                    <h1 className="text-3xl font-semibold">{name}</h1>
                    <p className="text-gray-600">@{username}</p>
                </div>
            </div>
            <p className="text-lg font-medium mb-4">Email: {email}</p>
            <p className="text-lg font-medium mb-4">Role: {role}</p>
            <h2 className="text-2xl font-semibold mb-4">Courses Bought</h2>
            <ul className="list-disc ml-8">
                {coursesBought.map((course, index) => (
                    <li key={index} className="text-gray-700">{course}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
