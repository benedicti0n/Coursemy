import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
    isAuthenticated: boolean;
    profilePicture?: string | undefined;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, profilePicture, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        onLogout();
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="text-2xl font-semibold">
                <Link to="/">Coursemy</Link>
            </div>
            <div className="flex space-x-6 items-center">
                <Link to="/feed" className="text-gray-700 hover:text-blue-600">Courses</Link>
                {isAuthenticated ? (
                    <div className="relative">
                        {/* Profile Picture Button */}
                        <button onClick={handleProfileClick} className="focus:outline-none">
                            <img
                                src={profilePicture || 'https://via.placeholder.com/40'}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    My Profile
                                </Link>
                                <Link
                                    to="/learnings"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    My Learnings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-4 py-2 mr-1 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 ml-1 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                        >
                            Log In
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
