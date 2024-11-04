import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/auth/Signup/SignUpForm';
import LoginForm from './components/auth/Login/LoginForm';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/Homepage/Homepage';
import Feed from './components/Feed/Feed';
import Course from './components/Course/Course';
import Profile from './components/Profile/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assume user is authenticated for testing
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/40');

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
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
          <Route path="/course/:id" element={<Course
            name="Course Name"
            bannerPicture="https://via.placeholder.com/300"
            description="Sample description"
            price={49.99}
            createdBy="Creator Name"
            content={["Lesson 1", "Lesson 2", "Lesson 3"]}
            totalSold={100}
          />} />
          {isAuthenticated && (
            <Route path="/profile" element={<Profile
              profilePicture={profilePicture}
              name="User Name"
              username="username123"
              email="user@example.com"
              role="learner"
              coursesBought={["Course 1", "Course 2"]}
            />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
