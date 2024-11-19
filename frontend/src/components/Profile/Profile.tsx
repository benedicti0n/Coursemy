import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../Course/CourseCard';

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
                <p className={`text-lg font-medium mt-4 ${userDetails.role === 'creator' ? 'text-blue-600' : 'text-gray-500'}`}>
                    Role: {userDetails.role === 'creator' ? 'Creator' : 'Learner'}
                </p>
                {userDetails.role === 'creator' ? (
                    <button
                        onClick={navigateToCreateCourse}
                        className="mt-4 w-full border border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-50 transition-colors"
                    >
                        Create a Course
                    </button>
                ) : (
                    <p className="text-gray-500">You are a learner. Explore more courses!</p>
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

            <div className="w-full max-w-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Created</h2>
                {userDetails.coursesCreated.length > 0 ? (
                    <div className="grid gap-4">
                        {userDetails.coursesCreated.map((course) => (
                            <CourseCard
                                _id={course._id}
                                key={course._id}
                                bannerPicture={course.bannerPicture}
                                name={course.name}
                                description={course.description}
                                price={course.price}
                                totalSold={course.totalSold}
                                onClick={() => redirectToCourse(course._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No courses created yet.</p>
                )}
            </div>
        </div >
    );
};

export default Profile;
