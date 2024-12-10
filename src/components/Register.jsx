import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/user';
import { alumniRegister } from '../redux/actions/alumni';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        graduationYear: '',
        fieldOfStudy: '',
        profession: '',
        industry: '',
        jobLocation: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        linkedin: '',
        github: '',
        twitter: '',
        instagram: '',
        portfolio: '',
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, alumniError, isAlumniAuthenticated } = useSelector((state) => state.alumni);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.firstName) {
            toast.error('First Name is required.');
            return false;
        }
        if (!formData.lastName) {
            toast.error('Last Name is required.');
            return false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Enter a valid email address.');
            return false;
        }
        if (!formData.graduationYear) {
            toast.error('Graduation Year is required.');
            return false;
        }
        if (!formData.fieldOfStudy) {
            toast.error('Course is required.');
            return false;
        }
        if (!formData.profession) {
            toast.error('Profession is required.');
            return false;
        }
        if (!formData.industry) {
            toast.error('Industry is required.');
            return false;
        }
        if (!formData.jobLocation) {
            toast.error('Job Location is required.');
            return false;
        }
        if (!formData.dateOfBirth) {
            toast.error('Date of Birth is required.');
            return false;
        }
        if (!formData.password) {
            toast.error('Password is required.');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const { confirmPassword, ...finalData } = formData;
            await dispatch(alumniRegister(finalData));
            navigate("/registeredCard")
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFormData({ ...formData, file: file });
        setPreview(URL.createObjectURL(file));
    };

    useEffect(() => {
        // if (isAlumniAuthenticated) {
        //     navigate('/');
        // }
        if (alumniError) {
            toast.error(alumniError);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, message, alumniError, isAlumniAuthenticated, navigate]);

    return (
        <div className="flex flex-row min-h-screen">
            <div className="flex justify-center items-center w-full px-4">
                <div className="bg-white rounded-lg w-full p-6">
                    <h1 className="text-2xl font-semibold mb-4">Create an account!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="graduationYear">Graduation Year</label>
                                <select
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                >
                                    <option value="">Select</option>
                                    {[...Array(21)].map((_, i) => (
                                        <option key={2010 + i} value={2010 + i}>
                                            {2010 + i}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="fieldOfStudy">Course</label>
                                <select
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                >
                                    <option value="">Select</option>
                                    {['Integrated Btech-Mtech', 'Btech', 'Mtech', 'BCA', 'MCA', 'Bsc', 'Msc', 'Biotech', 'BBA', 'MBA', 'BA', 'MA', 'PhD'].map(
                                        (fieldOfStudy) => (
                                            <option key={fieldOfStudy} value={fieldOfStudy}>
                                                {fieldOfStudy}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="profession">Profession</label>
                                <input
                                    type="text"
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="industry">Industry</label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                >
                                    <option value="">Select</option>
                                    {[
                                        'Google',
                                        'Amazon',
                                        'Microsoft',
                                        'Apple',
                                        'Facebook',
                                        'IBM',
                                        'Oracle',
                                        'Tesla',
                                        'Intel',
                                        'Samsung',
                                        'Cisco',
                                        'Adobe',
                                        'Salesforce',
                                        'Twitter',
                                        'LinkedIn',
                                        'Netflix',
                                        'Uber',
                                        'Spotify',
                                        'Airbnb',
                                        'SpaceX',
                                    ].map((company) => (
                                        <option key={company} value={company}>
                                            {company}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="jobLocation"> Location</label>
                                <input
                                    type="text"
                                    name="jobLocation"
                                    value={formData.jobLocation}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="github">GitHub Profile (Optional)</label>
                                <input
                                    type="text"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="twitter">Twitter Profile (Optional)</label>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="instagram">Instagram Profile (Optional)</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="portfolio">Portfolio URL (Optional)</label>
                                <input
                                    type="text"
                                    name="portfolio"
                                    value={formData.portfolio}
                                    onChange={handleChange}
                                    className="p-3 border rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="file">Profile Image</label>
                                <input
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="p-3 border rounded-md"
                                />
                                {preview && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">Image Preview:</p>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-md border"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            Register
                        </button>
                    </form>
                    <p className="mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
