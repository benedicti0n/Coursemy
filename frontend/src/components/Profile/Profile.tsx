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
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const token = checkToken();
                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                const response = await axios.get<IUserDetails>(`${serverUrl}/api/v1/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserDetails(response.data);
                setIsCreator(response.data.role === "creator");
            } catch (error: any) {
                console.error('Error details:', error.response?.data || error.message);
                setError('Failed to fetch profile details');
            }
        };

        fetchProfileDetails();
    }, []);

    const becomeCreator = async () => {
        try {
            const token = checkToken();
            if (!token) {
                setError("No authentication token found");
                return;
            }

            const result = await axios.post(
                `${serverUrl}/api/v1/user/profile`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (result.status === 409) {
                console.log("Error changing the role");
                return;
            }

            setIsCreator(true);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToCreateCourse = () => {
        navigate("/createCourse");
    };

    if (error) {
        return <div className="p-8 text-red-500">{error}</div>;
    }

    if (!userDetails) {
        return <div className="p-8 text-gray-500">Loading...</div>;
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex flex-col items-center mb-8">
                <img
                    src={userDetails.profilePicture || '/default-avatar.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full shadow-md mb-4"
                />
                <h1 className="text-2xl font-semibold text-gray-900">{userDetails.name}</h1>
                <p className="text-gray-600">@{userDetails.username}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-lg text-center">
                <p className="text-gray-700">Email: {userDetails.email}</p>
                <p className={`text-lg font-medium mt-4 ${isCreator ? 'text-blue-600' : 'text-gray-500'}`}>
                    Role: {isCreator ? 'Creator' : 'Learner'}
                </p>
                {isCreator ? (
                    <button
                        onClick={navigateToCreateCourse}
                        className="mt-4 w-full border border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-50 transition-colors"
                    >
                        Create a Course
                    </button>
                ) : (
                    <button
                        onClick={becomeCreator}
                        className="mt-4 w-full border border-gray-500 text-gray-600 rounded-lg py-2 hover:bg-gray-100 transition-colors"
                    >
                        Become a Creator?
                    </button>
                )}
            </div>

            <div className="w-full max-w-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Bought</h2>
                {userDetails.coursesBought.length > 0 ? (
                    <ul className="bg-white rounded-lg shadow p-4">
                        {userDetails.coursesBought.map((course, index) => (
                            <li key={index} className="text-gray-700 py-1 border-b last:border-none">
                                {course}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No courses bought yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
