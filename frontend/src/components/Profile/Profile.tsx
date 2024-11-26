import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../Course/CourseCard';
import Button from '../../ui/Button';
import checkToken from '../../util/checkToken';
import EditProfileModal from './EditProfileModal';
import ConfirmDelete from './ConfirmDelete';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';


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
    role: 'creator' | 'learner';
    coursesBought: string[];
    coursesCreated: ICourse[];
}

interface ProfileProps {
    userDetails: IUserDetails | null;
}

const Profile: React.FC<ProfileProps> = ({ userDetails }) => {
    const navigate = useNavigate();
    const [isCreator, setIsCreator] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState<boolean>(false)

    useEffect(() => {
        if (userDetails?.role === 'creator') {
            setIsCreator(true)
        }
    }, [userDetails])


    if (!userDetails) {
        return <div className="p-8 text-gray-500">Loading...</div>;
    }

    const becomeCreator = async () => {
        try {
            const token = checkToken()
            const response = await axios.post(`${serverUrl}/api/v1/user/profile`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response) {
                alert("Error changing role")
            }

            setIsCreator(true)
        } catch (error) {
            console.error(error);
        }
    }



    const navigateToCreateCourse = () => {
        navigate('/createCourse');
    };

    const redirectToCourse = (courseId: string) => {
        navigate(`course/${courseId}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-10">
                <img
                    src={userDetails.profilePicture || '/default-avatar.png'}
                    alt="Profile"
                    className="w-40 h-40 rounded-full shadow-lg mb-6"
                />
                <h1 className="text-3xl font-semibold text-gray-900">{userDetails.name}</h1>
                <p className="text-xl text-gray-600">@{userDetails.username}</p>
                <p className="mt-2 text-lg text-gray-700">{userDetails.email}</p>
                <div className="flex mt-4">
                    <Button onClick={() => setIsEditModalOpen(true)} variant="primary">
                        Edit Profile
                    </Button>

                    {/* just for some margin right to edit profile please ignore */}
                    <div className='mr-4'></div>

                    {isEditModalOpen && (
                        <EditProfileModal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            userDetails={userDetails}
                        />
                    )}

                    <Button onClick={() => setIsConfirmDeleteModalOpen(true)} variant="danger"
                    >
                        Delete Account
                    </Button>

                    {isConfirmDeleteModalOpen && (
                        <ConfirmDelete
                            isOpen={isConfirmDeleteModalOpen}
                            onClose={() => setIsConfirmDeleteModalOpen(false)}
                            userId={userDetails._id}
                        />
                    )}
                </div>
            </div>

            {/* User Role & Actions */}
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
                <div className="flex justify-between items-center mb-6">
                    <p className={`text-lg font-medium ${isCreator ? 'text-black' : 'text-gray-500'}`}>
                        Role: {isCreator ? 'Creator' : 'Learner'}
                    </p>
                    {isCreator ? (
                        <Button
                            onClick={navigateToCreateCourse}
                            variant="secondary"
                        >
                            Create a Course
                        </Button>
                    ) : (
                        <Button
                            onClick={becomeCreator}
                            variant='primary'
                        >
                            Become a creator
                        </Button>
                    )}
                </div>
                <p className="text-gray-600">
                    {isCreator ? 'As a creator, you can create courses for learners.' : 'As a learner, explore and purchase courses!'}
                </p>
            </div>

            {/* Courses Created */}
            {
                isCreator &&
                <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Created</h2>
                    {userDetails.coursesCreated.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userDetails.coursesCreated.map((course) => (
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
            }

        </div >
    );
};

export default Profile;
