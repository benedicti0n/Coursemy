import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-6">
                <h1 className="text-6xl font-extrabold text-black">Coursemy</h1>
                <p className="text-lg text-gray-700">Learn anything, anywhere, anytime</p>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            </div>
        </div>
    );
};

export default Homepage;
