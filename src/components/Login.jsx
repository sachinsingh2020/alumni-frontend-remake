import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { alumniLogin } from "../redux/actions/alumni";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, isAlumniAuthenticated } = useSelector(
        (state) => state.alumni
    );

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === "" || password.trim() === "") {
            toast.error("Please fill all the fields");
            return;
        }
        setLoading(true); // Start loading
        await dispatch(alumniLogin(email, password));
        setLoading(false); // Stop loading after action completes
    };

    useEffect(() => {
        if (isAlumniAuthenticated) {
            navigate("/");
        }
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
        setLoading(false); // Ensure loading stops if login completes or fails
    }, [dispatch, message, error, isAlumniAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="flex w-full items-center justify-center bg-white p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6">Login</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading} // Disable button when loading
                            className={`w-full flex items-center justify-center ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#013421] hover:bg-green-800"
                                } text-white p-3 rounded-md transition duration-300`}
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.42.879 4.63 2.341 6.341l1.659-1.05z"
                                    ></path>
                                </svg>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#f98b03] font-medium hover:underline"
                        >
                            Sign up for free.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
