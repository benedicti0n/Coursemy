import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiBookOpen } from 'react-icons/fi';
import Button from '../../ui/Button';

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
        <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
            {/* Brand Logo */}
            <div className="text-2xl font-bold text-black">
                <Link to="/">Coursemy</Link>
            </div>

            {/* Navigation Links & Profile */}
            <div className="flex items-center space-x-6">
                <Link
                    to="/feed"
                    className="text-gray-700 hover:text-black transition-colors"
                >
                    Courses
                </Link>

                {isAuthenticated ? (
                    <div className="relative">
                        {/* Profile Picture */}
                        <button
                            onClick={handleProfileClick}
                            className="focus:outline-none rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all"
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
                                    <FiUser className="text-black" />
                                    My Profile
                                </Link>
                                <Link
                                    to="/learnings"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <FiBookOpen className="text-black" />
                                    My Learnings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <FiLogOut className="text-black" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Button
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            variant="secondary"
                        >
                            Log In
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
