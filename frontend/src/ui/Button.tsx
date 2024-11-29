import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean; // Optional prop for full width on smaller screens
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    type = 'button',
    fullWidth = false,
}) => {
    const baseStyles = `
        font-medium rounded-lg transition duration-300 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        px-4 py-2 text-sm 
        sm:px-6 sm:py-3 sm:text-base
        md:px-6 md:py-4 md:text-md
        lg:px-6 lg:py-3 lg:text-md
    `;

    const variants = {
        primary: 'border border-black text-black hover:bg-black hover:text-white focus:ring-black',
        secondary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-800',
        danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : 'w-auto'
                }`}
        >
            {children}
        </button>
    );
};

export default Button;
