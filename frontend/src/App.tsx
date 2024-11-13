import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import checkToken from './util/checkToken';

import SignUpForm from './components/auth/Signup/SignUpForm';
import LoginForm from './components/auth/Login/LoginForm';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Homepage/Homepage';
import Feed from './components/Feed/Feed';
import Course from './components/Course/Course';
import Profile from './components/Profile/Profile';
import CourseForm from './components/Course/CourseForm';

interface IUserDetails {
  profilePicture?: string;
  name: string;
  username: string;
  email: string;
  role: 'creator' | 'learner';
  coursesBought: string[];
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

      setUserDetails(response.data);
      setProfilePicture(response.data.profilePicture);
    } catch (error: any) {
      console.error('Error fetching profile details:', error.response?.data || error.message);
    }
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        await fetchProfileDetails(); // Fetch profile details after authentication
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
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={isAuthenticated} profilePicture={profilePicture} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLogin} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/createCourse" element={<CourseForm />} />
        <Route path="feed/course/:courseId" element={<Course />} />
        {isAuthenticated && (
          <Route path="/profile" element={<Profile userDetails={userDetails} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
