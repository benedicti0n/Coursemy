import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CourseCard from "../Course/CourseCard";
import checkToken from "../../util/checkToken";

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

interface ICourseCard {
    _id: string;
    bannerPicture: string;
    name: string;
    description: string;
    totalSold: number;
    price: number;
    onClick: () => void;
}

const MyLearning = () => {
    const [boughtCourses, setBoughtCourses] = useState<ICourseCard[] | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const token = checkToken()
            try {
                const response = await axios.get(`${serverUrl}/api/v1/user/boughtCourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data.coursesBought

                setBoughtCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        fetchCourses();

    }, []);

    useEffect(() => {
        console.log(boughtCourses);
    }, [boughtCourses]);

    const redirectToCourse = (courseId: string) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="p-8 bg-white min-h-screen pt-28">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Courses</h2>
            {boughtCourses ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {boughtCourses.map((course) => (
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
                <div className="text-center text-gray-600 mt-12">Loading courses...</div>
            )}
        </div>
    )
}

export default MyLearning