import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../../../ui/Button";

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

interface FormData {
    username: string;
    password: string;
}

interface ILoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onLoginSuccess }) => {
    const { handleSubmit, register } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await axios.post(`${serverUrl}/api/v1/auth/login`, data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            onLoginSuccess();
            navigate("/feed");
        } catch (error) {
            console.error("Login failed:", error);
        }
    });

    return (
        <form
            onSubmit={onSubmit}
            className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
        >
            <div className="space-y-4 flex flex-col items-center">
                <input
                    {...register("username")}
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Button
                    type="submit"
                    variant="secondary"
                >
                    Login
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
