import React from 'react';

const Homepage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="text-center space-y-6 flex flex-col items-center">
                <img src="/coursemy.png" alt="" className='w-24' />
                <h1 className="text-6xl font-extrabold text-black">Coursemy</h1>
                <p className="text-lg text-gray-700">Learn anything, anywhere, anytime</p>
            </div>
        </div>
    );
};

export default Homepage;
