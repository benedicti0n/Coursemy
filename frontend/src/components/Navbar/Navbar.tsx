import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiBookOpen, FiMenu, FiX, FiBook } from 'react-icons/fi';
import Button from '../../ui/Button';

interface NavbarProps {
    isAuthenticated: boolean;
    profilePicture?: string;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, profilePicture, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown
    const navigate = useNavigate();

    useEffect(() => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    }, [isAuthenticated]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        onLogout();
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-white shadow-md border-b-2 absolute top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-8">
                {/* Brand Logo */}
                <div className="text-2xl font-bold text-black flex items-center">
                    <Link to="/">
                        <img src="/coursemy.png" alt="Coursemy Logo" className="h-10" />
                    </Link>
                    <h1 className="pl-2">Coursemy</h1>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-gray-700 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute z-10 top-16 left-0 w-full bg-white shadow-lg border-t-2 lg:hidden">
                        <div className="flex flex-col space-y-4 p-4">
                            <Button
                                onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    navigate("/feed")
                                }}
                                variant='primary'
                            >
                                Courses
                            </Button>

                            {isAuthenticated ? (
                                <>
                                    <Button
                                        variant='primary'
                                        onClick={() => {
                                            setIsMobileMenuOpen(false)
                                            navigate("/profile")
                                        }}
                                    >
                                        My Profile
                                    </Button>
                                    <Button
                                        variant='primary'
                                        onClick={() => {
                                            setIsMobileMenuOpen(false)
                                            navigate("/learnings")
                                        }}
                                    >
                                        Learnings
                                    </Button>
                                    <Button
                                        variant='primary'
                                        onClick={() => {
                                            setIsMobileMenuOpen(false)
                                            handleLogout()
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => {
                                        navigate('/signup')
                                        setIsMobileMenuOpen(false)
                                    }}
                                        variant="primary"
                                    >
                                        Sign Up
                                    </Button>
                                    <Button onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        navigate('/login')
                                    }}
                                        variant="secondary"
                                    >
                                        Log In
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6">
                    <Button
                        onClick={() => {
                            setIsMobileMenuOpen(false)
                            navigate("/feed")
                        }}
                        variant='primary'
                    >
                        Courses
                    </Button>

                    {isAuthenticated ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleProfileClick}
                                className="focus:outline-none rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <img
                                    src={profilePicture || 'https://via.placeholder.com/40'}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute z-10 right-0 mt-3 w-44 bg-white rounded-lg shadow-lg ring-1 ring-gray-200"
                                    role="menu"
                                >
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <FiUser className="text-black" />
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/learnings"
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
                            <Button onClick={() => navigate('/signup')} variant="primary">
                                Sign Up
                            </Button>
                            <Button onClick={() => navigate('/login')} variant="secondary">
                                Log In
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
