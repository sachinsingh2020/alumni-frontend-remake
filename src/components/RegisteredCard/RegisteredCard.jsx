import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import gbuLogo from "../../assets/gbuLogo.webp";
import signature from "../../assets/signature.png";

const RegisteredCard = () => {
    const { alumniUser } = useSelector((state) => state.alumni);
    const navigate = useNavigate();
    const componentRef = useRef();

    const handlePrint = async () => {
        window.scrollTo(0, 0);
        const canvas = await html2canvas(componentRef.current, {
            scale: 2,
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('registeredCard.pdf');
    };

    const handleContinue = () => {
        navigate("/");
    };

    return (
        alumniUser ? (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600 p-4">
                <div
                    ref={componentRef}
                    className="w-full max-w-md border border-gray-300 rounded-lg overflow-hidden shadow-lg font-sans bg-white"
                >
                    {/* Header */}
                    <div className="bg-[#2c3d4f] text-white text-center py-4 text-lg font-bold">
                        Gautam Buddha University Alumni Association
                    </div>
                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-40 bg-gray-300 flex items-center justify-center">
                                <img
                                    className="rounded-md w-full h-full object-cover"
                                    src={alumniUser.profilePic.url}
                                    alt="Profile"
                                    crossOrigin='anonymous'
                                />
                            </div>
                            <div className="text-center mt-2">
                                <div className="text-lg font-bold">
                                    {alumniUser.firstName} {alumniUser.lastName}
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="text-sm text-gray-700 space-y-2 font-semibold">
                            <div>
                                <span className="font-bold">Date of Registration:</span> {alumniUser.createdAt ? new Date(alumniUser.createdAt).toLocaleDateString('en-US') : '01 Jan 2015'}
                            </div>
                            <div>
                                <span className="font-bold">Email:</span> {alumniUser.email || 'name@companyname.com'}
                            </div>
                            <div>
                                <span className="font-bold">Year Of Passing:</span> {alumniUser.graduationYear || 'XXXX'}
                            </div>
                            <div>
                                <span className="font-bold">Course:</span> {alumniUser.fieldOfStudy || 'N/A'}
                            </div>
                        </div>

                        {/* QR Code and Logo */}
                        <div className="flex flex-col items-center">
                            <img src={gbuLogo} alt="GBU Logo" className="w-16 h-16 mb-4" />
                            <QRCodeSVG value={alumniUser._id || "Default_ID"} size={100} />
                        </div>

                        {/* Signature */}
                        <div className="flex flex-col items-center mt-4">
                            <img src={signature} alt="Signature" className="w-20 h-10" />
                            <div className="font-bold">President</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#2c3d4f] text-sm text-gray-700 py-2 px-4">
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
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
                    >
                        Print Card
                    </button>
                    <button
                        onClick={handleContinue}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
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
