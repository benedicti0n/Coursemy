import React, { useState } from 'react'
import './Signup.css' // We'll create this file for styling
import axios from 'axios'; // Add this import

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signup', formData);
            console.log('Signup successful:', response.data);
            // Handle successful signup (e.g., redirect to login page or show success message)
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message);
            // Handle signup error (e.g., show error message to user)
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    accept="image/*"
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
