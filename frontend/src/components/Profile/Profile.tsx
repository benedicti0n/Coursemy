import React, { useState, useEffect } from 'react';
import axios from 'axios';
import checkToken from '../../util/checkToken';

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
            {isCreator ? (
                <p className="text-lg font-medium mb-4">Role: Creator</p>
            ) : (
                <p className="text-lg font-medium mb-4">Role: Learner</p>
            )}
            <button onClick={becomeCreator}>Become a creator?</button>
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
