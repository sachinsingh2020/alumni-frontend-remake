import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom'; // For redirection
import gbuLogo from "../../assets/gbuLogo.webp";
import signature from "../../assets/signature.png";

const RegisteredCard = () => {
    const { alumniUser } = useSelector((state) => state.alumni);
    const navigate = useNavigate(); // Navigation hook
    const componentRef = useRef();

    const handlePrint = async () => {
        window.scrollTo(0, 0); // Scroll to top before taking screenshot
        const canvas = await html2canvas(componentRef.current, {
            scale: 2, // Increase resolution for better quality
            useCORS: true, // Enable CORS
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210); // A4 size: 297 x 210 mm
        pdf.save('registeredCard.pdf'); // Download PDF


    };

    const handleContinue = () => {
        navigate("/"); // Replace '/home' with your home page route
    };

    return (
        alumniUser ? (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600 w-full h-full">
                <div
                    ref={componentRef}
                    className="w-[700px] border border-gray-300 rounded-lg overflow-hidden shadow-lg font-sans bg-white"
                >
                    {/* Header */}
                    <div className="bg-[#2c3d4f] text-white text-center py-4 text-[25px] font-bold">
                        Gautam Buddha University Alumni Association
                    </div>
                    {/* Content */}
                    <div className="px-6 py-4 flex justify-between align-center">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center justify-center mb-4">
                            <div className="w-[120px] h-[150px] bg-gray-300 flex items-center justify-center">
                                <img
                                    className="rounded-md w-full h-full object-cover"
                                    src={alumniUser.profilePic.url}
                                    alt=""
                                    crossOrigin='anonymous'
                                />
                            </div>
                            <div className="flex items-center justify-center mt-2">
                                <div className="text-[20px] font-bold">
                                    {alumniUser.firstName} {alumniUser.lastName}
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="text-sm text-gray-700 space-y-2 font-semibold flex flex-col justify-evenly align-center">
                            <div className="text-[23px]">
                                <span className="font-bold">Date of Registration:</span>{" "}
                                {alumniUser.createdAt ? new Date(alumniUser.createdAt).toLocaleDateString('en-US') : '01 Jan 2015'}
                            </div>
                            <div className="text-[23px]">
                                <span className="font-bold">Email:</span> {alumniUser.email || 'name@companyname.com'}
                            </div>
                            <div className="text-[23px]">
                                <span className="font-bold">Year Of Passing:</span> {alumniUser.graduationYear || 'XXXX'}
                            </div>
                            <div className="text-[23px]">
                                <span className="font-bold">Course :</span> {alumniUser.fieldOfStudy || 'Your Company Address'}
                            </div>
                        </div>

                        {/* QR Code and Signature */}
                        <div className="flex flex-col justify-between items-center">
                            <img src={gbuLogo} alt="GBU Logo" className="w-20 h-20 mb-4" />
                            <div className="w-20 h-20 mt-4">
                                <QRCodeSVG value={alumniUser._id || "Default_ID"} size={80} />
                            </div>
                            <div className="flex flex-col items-center justify-center mt-4">
                                <img src={signature} alt="Signature" className="w-[80px] h-[40px] mt-4" />
                                <div className="font-bold">President</div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="bg-[#2c3d4f] text-md text-gray-700 py-2 px-4">
                        <div className="text-center text-white">
                            Gautam Buddha University, Greater Noida
                        </div>
                        <div className="text-center text-white">
                            © 2024 All Rights Reserved
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={handlePrint}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        Print Card
                    </button>
                    <button
                        onClick={handleContinue}
                        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    >
                        Continue
                    </button>
                </div>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default RegisteredCard;
