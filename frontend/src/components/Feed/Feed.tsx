import React, { useEffect, useState } from 'react'
import axios from 'axios';

import CourseCard from '../Course/CourseCard';
import { useNavigate } from 'react-router-dom';

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface ICourseCard {
  _id: string;
  bannerPicture: string;
  name: string;
  createdBy: { userId: string; name: string; _id: string }[];
  totalSold: number;
  price: number;
  onClick: () => void;
}

const Feed: React.FC = () => {
  const [allCourses, setAllCourses] = useState<ICourseCard[] | null>(null)

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/v1/course/feed`)
        const data = response.data

        setAllCourses(data)
      } catch (error) {
        console.error(error);
      }
    }

    getAllCourses()

  }, [])

  const navigate = useNavigate()

  const redirectToCourse = (courseId: string) => {
    navigate(`course/${courseId}`)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Available Courses</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allCourses?.map((course) => (
          <CourseCard
            key={course._id}
            id={course._id}
            bannerPicture={course.bannerPicture}
            name={course.name}
            creator={course.createdBy[0]?.name}
            totalSold={course.totalSold}
            price={course.price}
            onClick={() => redirectToCourse(course._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
