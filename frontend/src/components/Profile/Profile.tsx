import React, { useState, useEffect } from 'react';
import axios from 'axios';
import checkToken from '../../util/checkToken';
import { useNavigate } from 'react-router-dom';

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
    const [isCreator, setIsCreator] = useState<Boolean>(false)
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const token = checkToken()

                if (!token) {
                    setError('No authentication token found');
                    return;
                }

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

                if (response.data.role === "creator") {
                    setIsCreator(true)
                }
            } catch (error: any) {
                console.error('Error details:', error.response?.data || error.message);
                setError('Failed to fetch profile details');
            }
        };


        fetchProfileDetails();
    }, []);

    const becomeCreator = async () => {
        try {
            const token = checkToken()

            if (!token) {
                setError("No auth token found")
                return
            }

            const result = await axios.post(`${serverUrl}/api/v1/user/profile`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            if (result.status === 409) {
                console.log("Error changing the role");
                return
            }

            setIsCreator(true)

        } catch (error) {
            console.error(error);
        }
    }

    const navigateToCreateCourse = () => {
        navigate("/createCourse")
    }


    if (error) {
        return <div className="p-8 text-red-600">{error}</div>;
    }

    if (!userDetails) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="flex items-center mb-6 border-b-2 border-gray-300 pb-4">
                <img
                    src={userDetails.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-6 shadow-lg"
                />
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">{userDetails.name}</h1>
                    <p className="text-gray-600">@{userDetails.username}</p>
                </div>
            </div>
            <p className="text-lg font-medium mb-4 text-gray-700">Email: {userDetails.email}</p>
            {isCreator ? (
                <div className="mb-4">
                    <p className="text-lg font-medium mb-2 text-green-600">Role: Creator</p>
                    <button onClick={navigateToCreateCourse} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Create a course
                    </button>
                </div>
            ) : (
                <p className="text-lg font-medium mb-4 text-red-600">Role: Learner</p>
            )}
            {!isCreator && <button onClick={becomeCreator} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Become a creator?</button>}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Courses Bought</h2>
            <ul className="list-disc ml-8">
                {userDetails.coursesBought.map((course, index) => (
                    <li key={index} className="text-gray-700">{course}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
