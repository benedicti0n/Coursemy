import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const serverUrl: string = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

interface FormData {
    username: string;
    password: string;
}

const LoginForm = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const navigate = useNavigate()
    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await axios.post(`${serverUrl}/api/v1/auth/login`, data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/feed")
        } catch (error) {
            console.error("Login failed:", error);
        }
    });

    return (
        <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="space-y-4">
                <input
                    {...register("username")}
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
