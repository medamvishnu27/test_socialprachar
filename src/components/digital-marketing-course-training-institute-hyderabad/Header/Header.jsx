/** @format */
"use client";
import React, { useState } from "react";
import style from "./Header.module.css";
import {
  Phone,
  Check,
  Award,
  Clock,
  BookOpen,
  Download,
  ChevronDown,
  Crown,
} from "lucide-react";
import SP_logo from "../../../assets/digitalMarketing/DMLogo.png";
// import Image from "next/image";
import DMForm from "../DMForm/DMForm";
import ApplyButton from '../DMForm/DMFormButton';


const stats = [
  { value: "3 Months", label: "Duration" },
  { value: "16000+", label: "Course Enrolments" },
  { value: "100%", label: "Job Guarantee" },
  { value: "300+", label: "Hiring Partners" },
  { value: "10+", label: "Assured Interviews" },
];

const Header = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
 const [showModal, setShowModal] = useState(false);
 
   const handleViewMoreClick = () => {
     setShowModal(true); // Show the modal when the button is clicked
   };
 
   const handleCloseModal = () => {
     setShowModal(false); // Hide the modal
   };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2 py-10 max-w-7xl mx-auto">
            {/* Left Section */}
            <div className="lg:col-span-8">
              {/* Logos */}
              <div className="flex items-center mb-6">
                <img
                  src={SP_logo}
                  alt="Logo"
                  width={200}
                  height={64}
                  className="w-[260px] h-auto max-h-20 mr-4"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center mb-4">
                <div className="flex items-center gap-2 px-2">
                  <Crown
                    className={`${style.tagLogo} text-yellow-300`}
                    size={24}
                  />
                  <p className={`${style.tag} text-white text-sm sm:text-base`}>
                    100% Job Guarantee Programs
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`${style.tagLogo} text-white`} size={24} />
                  <p className={`${style.tag} text-white text-sm sm:text-base`}>
                    Online & Classroom
                  </p>
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-300 mb-4 leading-tight">
                Master Digital Marketing &<br />
                Generative AI
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-4">
                Learn From Entrepreneurs & Real-Time Experts
              </p>

              {/* Rating */}
              <div className="flex items-center flex-wrap mb-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-yellow-300 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm sm:text-base">
                  4.8 Rating | 16000+ Enrolments | 800+ Placement Partners
                </span>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-300 mb-6">
                Supercharge your career in Digital Marketing Course with our
                Digital Marketing Program coupled with a 3 month internship from
                Hyderabad’s Leading Digital Marketing Training Institute in
                India.
              </p>

              {/* Info Tags */}
              <div className="flex flex-wrap gap-4 text-sm sm:text-base mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>3 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span>25+ Case Studies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={20} />
                  <span>10+ Global Certifications</span>
                </div>
              </div>

              {/* Rank Note */}
              <div className="flex items-start gap-2 mb-6">
                <Check className="text-white mt-1" size={20} />
                <p className="text-sm sm:text-base">
                  Ranked #1 Digital Marketing Program By Times Of India
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center justify-center text-sm sm:text-base"
                  onClick={handleViewMoreClick}
                >
                  <Download className="mr-2" size={20} />
                  Download Brochure
                </button>
                {showModal && (
                  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[10000]">
                    <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
                      {/* Updated position of the close button */}
                      <button
                        onClick={handleCloseModal}
                        className="absolute top-2 right-5 text-gray-600 hover:text-black z-[1010]"
                      >
                        X
                      </button>
                      <DMForm />
                    </div>
                  </div>
                )}
                <ApplyButton />
              </div>
            </div>

            {/* Right Section */}
            <div className="hidden lg:block lg:col-span-4 w-full">
              <DMForm />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="border-2 border-dashed border-blue-400 rounded-3xl p-6 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-2 md:px-4 w-full sm:w-1/2 md:w-1/5"
              >
                <h3 className="text-2xl font-bold text-black mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
