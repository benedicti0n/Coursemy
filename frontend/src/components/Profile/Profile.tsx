import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../Course/CourseCard';
import Button from '../../ui/Button';

interface ICourse {
    _id: string;
    bannerPicture?: string;
    name: string;
    description?: string;
    price: number;
    totalSold: number;
    onClick: () => void;
}

interface IUserDetails {
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

    if (!userDetails) {
        return <div className="p-8 text-gray-500">Loading...</div>;
    }

    const navigateToCreateCourse = () => {
        navigate('/createCourse');
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
            </div>

            {/* User Role & Actions */}
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
                <div className="flex justify-between items-center mb-6">
                    <p className={`text-lg font-medium ${userDetails.role === 'creator' ? 'text-black' : 'text-gray-500'}`}>
                        Role: {userDetails.role === 'creator' ? 'Creator' : 'Learner'}
                    </p>
                    {userDetails.role === 'creator' && (
                        <Button
                            onClick={navigateToCreateCourse}
                            variant="secondary"
                        >
                            Create a Course
                        </Button>
                    )}
                </div>
                <p className="text-gray-600">
                    {userDetails.role === 'creator' ? 'As a creator, you can create courses for learners.' : 'As a learner, explore and purchase courses!'}
                </p>
            </div>

            {/* Courses Bought */}
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Bought</h2>
                {userDetails.coursesBought.length > 0 ? (
                    <ul className="space-y-2">
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

            {/* Courses Created */}
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Created</h2>
                {userDetails.coursesCreated.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userDetails.coursesCreated.map((course) => (
                            <CourseCard
                                _id={course._id}
                                key={course._id}
                                bannerPicture={course.bannerPicture}
                                name={course.name}
                                description={course.description}
                                price={course.price}
                                totalSold={course.totalSold}
                                onClick={() => navigate(`/course/${course._id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No courses created yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
