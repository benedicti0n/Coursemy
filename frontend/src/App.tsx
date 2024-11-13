import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpForm from './components/auth/Signup/SignUpForm';
import LoginForm from './components/auth/Login/LoginForm';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Homepage/Homepage';
import Feed from './components/Feed/Feed';
import Course from './components/Course/Course';
import Profile from './components/Profile/Profile';
import CourseForm from './components/Course/CourseForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    setProfilePicture(undefined)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={isAuthenticated}
        profilePicture={profilePicture}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/createCourse" element={<CourseForm />} />
        <Route path="feed/course/:courseId" element={<Course />} />
        {isAuthenticated && (
          <Route path="/profile" element={<Profile />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
