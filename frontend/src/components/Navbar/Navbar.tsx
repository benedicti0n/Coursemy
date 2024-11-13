import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiBookOpen } from 'react-icons/fi';

interface NavbarProps {
    isAuthenticated: boolean;
    profilePicture?: string;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, profilePicture, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsDropdownOpen(false); // Close dropdown when authentication state changes
    }, [isAuthenticated]);

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        onLogout();
        setIsDropdownOpen(false);
    };

    return (
        <nav className="flex justify-between items-center py-4 px-8 bg-gray-100 shadow-sm">
            {/* Brand Logo */}
            <div className="text-2xl font-bold text-gray-800">
                <Link to="/">Coursemy</Link>
            </div>

            {/* Navigation Links & Profile */}
            <div className="flex items-center space-x-6">
                <Link to="/feed" className="text-gray-700 hover:text-blue-500 transition-colors">
                    Courses
                </Link>

                {isAuthenticated ? (
                    <div className="relative">
                        {/* Profile Picture */}
                        <button
                            onClick={handleProfileClick}
                            className="focus:outline-none rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all"
                        >
                            <img
                                src={profilePicture || 'https://via.placeholder.com/40'}
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute z-10 right-0 mt-3 w-44 bg-white rounded-lg shadow-lg ring-1 ring-gray-200">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <FiUser className="text-blue-500" />
                                    My Profile
                                </Link>
                                <Link
                                    to="/learnings"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <FiBookOpen className="text-blue-500" />
                                    My Learnings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <FiLogOut className="text-blue-500" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
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
