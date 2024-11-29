import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import checkToken from './util/checkToken';

import SignUpForm from './components/auth/Signup/SignUpForm';
import LoginForm from './components/auth/Login/LoginForm';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Homepage/Homepage';
import Feed from './components/Feed/Feed';
import Course from './components/Course/Course';
import Profile from './components/Profile/Profile';
import CreatorProfile from './components/Profile/CreatorProfile';
import CourseForm from './components/Course/CourseForm';
import MyLearning from './components/MyLearning/MyLearning';

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
  wallet: number;
  coursesBought: string[];
  coursesCreated: ICourse[];
}


const serverUrl: string = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
  const navigate = useNavigate();

  const fetchProfileDetails = async () => {
    try {
      const token = checkToken();
      if (!token) return;

      const response = await axios.get<IUserDetails>(`${serverUrl}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data
      console.log(userData);
      setUserDetails(userData);
      setProfilePicture(userData.profilePicture);
    } catch (error: any) {
      console.error('Error fetching profile details:', error.response?.data || error.message);
    }
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        await fetchProfileDetails();
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserDetails(null);
    setProfilePicture(undefined);
    navigate('/');
  };

  const handleLogin = async () => {
    setIsAuthenticated(true);
    await fetchProfileDetails();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-center relative">
      <Navbar isAuthenticated={isAuthenticated} profilePicture={profilePicture} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLogin} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/profile/:creatorId" element={<CreatorProfile />} />

        {isAuthenticated && (
          <Route path="/createCourse" element={<CourseForm />} />
        )}
        {isAuthenticated && (
          <Route path="/profile" element={<Profile userDetails={userDetails} />} />
        )}
        {isAuthenticated && (
          <Route path="/learnings" element={<MyLearning />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
