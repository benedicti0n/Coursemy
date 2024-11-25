import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
    const baseStyles =
        'px-6 py-3 font-medium rounded-lg transition duration-300 focus:outline-none focus:ring-2';
    const variants = {
        primary: 'border border-black text-black hover:bg-black hover:text-white',
        secondary: 'bg-black text-white hover:bg-gray-800',
        danger: 'bg-red-500 text-white hover:bg-red-700',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {children}
        </button>
    );
};

export default Button;
