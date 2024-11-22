import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CourseCard from "../Course/CourseCard";

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface ICourseCard {
  _id: string;
  bannerPicture: string;
  name: string;
  totalSold: number;
  price: number;
  onClick: () => void;
}

const Feed: React.FC = () => {
  const [allCourses, setAllCourses] = useState<ICourseCard[] | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/v1/course/feed`);
        setAllCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();

  }, []);
  console.log(allCourses);

  const redirectToCourse = (courseId: string) => {
    navigate(`course/${courseId}`);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Courses</h2>
      {allCourses ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allCourses.map((course) => (
            <CourseCard
              key={course._id}
              _id={course._id}
              bannerPicture={course.bannerPicture}
              name={course.name}
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
  );
};

export default Feed;
