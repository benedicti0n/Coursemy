import React from 'react';

interface Course {
  id: string;
  name: string;
  bannerPicture: string;
  description: string;
  price: number;
}

const courses: Course[] = [
  // Fetch or mock courses data here
];

const Feed: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Available Courses</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={course.bannerPicture} alt={course.name} className="rounded-md mb-4 h-40 w-full object-cover" />
            <h3 className="text-xl font-semibold">{course.name}</h3>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-lg font-bold mt-2">${course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
