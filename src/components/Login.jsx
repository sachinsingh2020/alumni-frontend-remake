import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { alumniLogin } from "../redux/actions/alumni";
import toast from "react-hot-toast";
import FrontPageBackgroundImage from "../assets/FrontPageBackgroundImage.jpg";
import gbuLogo from "../assets/gbuLogo.webp";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error, isAlumniAuthenticated, loading } = useSelector(
        (state) => state.alumni
    );

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === "" || password.trim() === "") {
            toast.error("Please fill all the fields");
            return;
        }
        await dispatch(alumniLogin(email, password));
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
    }, [dispatch, message, error, isAlumniAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div
                className="hidden lg:flex w-full lg:w-3/5 h-screen items-center justify-center"
                style={{
                    backgroundImage: `url(${FrontPageBackgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="flex flex-col items-center justify-start h-full w-full pt-12 "
                >
                    <div
                        className="text-5xl font-bold text-white px-4 text-center"
                        style={{
                            textShadow:
                                "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black",
                        }}
                    >Alumni Connect</div>
                    <p
                        className="text-3xl font-bold text-white px-4 text-center mt-2"
                        style={{
                            textShadow:
                                "2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black",
                        }}
                    >
                        One-stop platform to connect with alumni
                    </p>
                </div>

            </div>

            {/* Right Div with Login Form */}
            <div className="flex flex-col  w-full lg:w-2/5 items-center justify-center bg-white p-8">
                {/* this div should only when screen size if mobile  */}
                <div className="lg:hidden">
                    <h1 className="text-2xl font-bold mb-6 text-center">Alumni Connect Platform</h1>
                </div>
                <div className="mb-8">
                    <img
                        className="w-[138px] h-[138px] md:w-48 md:h-48 mx-auto"
                        src={gbuLogo}
                        alt=""
                    />
                </div>

                <div className="w-full max-w-md mt-4">
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
                                className="w-full p-3 border border-[#013421] rounded-md focus:outline-none focus:ring-2 focus:ring-[#013421] "
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
                                className="w-full p-3 border border-[#013421] rounded-md focus:outline-none focus:ring-2 focus:ring-[#013421]"
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
