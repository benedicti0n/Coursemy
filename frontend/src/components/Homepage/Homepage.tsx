import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h1 className="text-5xl font-bold mb-4">Coursemy</h1>
                <p className="text-lg text-gray-600 mb-8">Learn anything, anywhere, anytime</p>
                <button
                    onClick={() => navigate('/signup')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Homepage;
