import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alumniLogout } from '../redux/actions/alumni';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


const Home = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(alumniLogout());
    };
    const navigate = useNavigate();


    const { alumniUser, isAlumniAuthenticated, error, message } = useSelector((state) => state.alumni);

    useEffect(() => {
        console.log({ alumniUser })
    }, [alumniUser])

    useEffect(() => {
        if (!isAlumniAuthenticated) {
            navigate("/login"); // Redirect to Home
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900">
            <h1
                className='text-[#dc3545] text-4xl mb-6 font-bold bg-white border-4 border-[#dc3545] p-4 rounded-lg'
            >Hello {alumniUser.firstName} {alumniUser.lastName}, How are you</h1>
            <h1 className="text-white text-2xl mb-6">This is the Home Page</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;
