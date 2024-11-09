import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IUserDetails {
    profilePicture?: string;
    name: string;
    username: string;
    email: string;
    role: "creator" | "learner";
    coursesBought: string[];
}

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

const Profile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token); // Check if token exists

                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                console.log('Making request to:', `${serverUrl}/api/v1/user/profile`);
                const response = await axios.get<IUserDetails>(
                    `${serverUrl}/api/v1/user/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Response:', response.data);
                setUserDetails(response.data);
            } catch (error: any) {
                console.error('Error details:', error.response?.data || error.message);
                setError('Failed to fetch profile details');
            }
        };


        fetchProfileDetails();
    }, []);


    if (error) {
        return <div className="p-8 text-red-600">{error}</div>;
    }

    if (!userDetails) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center mb-6">
                <img
                    src={userDetails.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-6"
                />
                <div>
                    <h1 className="text-3xl font-semibold">{userDetails.name}</h1>
                    <p className="text-gray-600">@{userDetails.username}</p>
                </div>
            </div>
            <p className="text-lg font-medium mb-4">Email: {userDetails.email}</p>
            <p className="text-lg font-medium mb-4">Role: {userDetails.role}</p>
            <h2 className="text-2xl font-semibold mb-4">Courses Bought</h2>
            <ul className="list-disc ml-8">
                {userDetails.coursesBought.map((course, index) => (
                    <li key={index} className="text-gray-700">{course}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
