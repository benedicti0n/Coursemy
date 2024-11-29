import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../Course/CourseCard';

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

interface ICourse {
    _id: string;
    bannerPicture: string;
    name: string;
    description: string;
    totalSold: number;
    price: number;
    onClick: () => void;
}
interface IUserDetails {
    _id: string;
    profilePicture?: string;
    name: string;
    username: string;
    email: string;
    coursesCreated: ICourse[];
}

const CreatorProfile: React.FC = () => {
    const navigate = useNavigate();
    const [profileDetails, setProfileDetails] = useState<IUserDetails | null>()
    const { creatorId } = useParams()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.post(`${serverUrl}/api/v1/user/creatorProfile`, { creatorId })
                if (!response) {
                    alert("Creator not found")
                }
                const data = response.data
                setProfileDetails(data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchProfile()
    }, [])

    if (!profileDetails) {
        return <div className="p-8 text-gray-500">Loading...</div>;
    }

    const redirectToCourse = (courseId: string) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen w-full flex flex-col items-center relative pt-28">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-10">
                <img
                    src={profileDetails?.profilePicture || '/default-avatar.png'}
                    alt="Profile"
                    className="w-40 h-40 rounded-full shadow-lg mb-6"
                />
                <h1 className="text-3xl font-semibold text-gray-900">{profileDetails?.name}</h1>
                <p className="text-xl text-gray-600">@{profileDetails?.username}</p>
                <p className="mt-2 text-lg text-gray-700">{profileDetails?.email}</p>
                <div className="flex mt-4">

                    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Created</h2>
                        {profileDetails!.coursesCreated.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {profileDetails?.coursesCreated.map((course) => (
                                    <CourseCard
                                        key={course._id}
                                        _id={course._id}
                                        bannerPicture={course.bannerPicture}
                                        name={course.name}
                                        description={course.description}
                                        totalSold={course.totalSold}
                                        price={course.price}
                                        onClick={() => redirectToCourse(course._id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No courses created yet.</p>
                        )}
                    </div>
                </div >
            </div>
        </div>
    );
};

export default CreatorProfile;
