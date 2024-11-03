import React, { useState } from "react";

const Navbar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-semibold text-blue-500">
                    MyApp
                </div>

                {/* Navigation Items */}
                <div className="hidden md:flex space-x-6">
                    <span className="text-gray-700 hover:text-blue-500 cursor-pointer">
                        Home
                    </span>
                    <span className="text-gray-700 hover:text-blue-500 cursor-pointer">
                        Feed
                    </span>
                </div>

                {/* Profile Picture and Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="w-10 h-10 rounded-full bg-gray-300 focus:outline-none"
                    >
                        {/* Profile Picture Placeholder */}
                        <img
                            src="/path/to/profile-pic.jpg"
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Profile
                            </div>
                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                My Learnings
                            </div>
                            <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Become a Creator
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
