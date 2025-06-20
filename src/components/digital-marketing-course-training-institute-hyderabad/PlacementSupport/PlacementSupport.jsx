/** @format */
"use client"
import React from "react";
// Import your local icons (as components or images)
import CareerIcon from "../../../assets/digitalMarketing/tools-curiculam-62-1.png";
import ResumeIcon from "../../../assets/digitalMarketing/tools-curiculam-63-1 (1).png";
import MentorshipIcon from "../../../assets/digitalMarketing/tools-curiculam-62-1.png";
import MockInterviewIcon from "../../../assets/digitalMarketing/tools-curiculam-66-1-1.png";
import SoftSkillIcon from "../../../assets/digitalMarketing/e-1.png";
import PartnersIcon from "../../../assets/digitalMarketing/tools-curiculam-64-1.webp";
import women from "../../../assets/digitalMarketing/ChatGPT Image.png";
// import Image from "next/image";

const services = [
  { icon:CareerIcon, title: "Career Guidance" },
  { icon:ResumeIcon, title: "Resume Building" },
  { icon:MentorshipIcon, title: "Mentorship Sessions" },
  { icon:MockInterviewIcon, title: "Mock Interviews" },
  { icon:SoftSkillIcon, title: "Soft Skill Training" },
  { icon:PartnersIcon, title: "300+ Placement Partners" },
];

const PlacementSupport = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header with improved styling */}
          <div className="text-start md:text-start mb-16">
            <h1 className="font-extrabold text-3xl md:text-4xl text-gray-800 mb-4 relative inline-block">
              Placements Support
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-blue-600 rounded-full"></span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Get assured job opportunities from top companies with our
              pre-placement training program
            </p>
          </div>

          {/* Content with revised layout */}
          <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
            {/* Services with enhanced cards */}
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="mb-5 p-3 bg-blue-50 rounded-full">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-10 h-10 object-contain text-blue-600"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description ||
                      "Expert guidance to help you succeed"}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Side Section with consultant image - completely redesigned */}
            <div className="w-full md:w-1/3 flex justify-center relative mb-16 md:mb-0">
              {/* Modern floating badge */}
              <div
                className="absolute -top-6 right-1/2 md:right-auto md:-left-6 transform translate-x-1/2 md:translate-x-0 
                      bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 
                      rounded-2xl shadow-lg text-center z-20 flex items-center gap-3
                      transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-bold">10</div>
                <div className="text-sm md:text-base leading-tight font-medium text-left">
                  Assured
                  <br />
                  Interviews
                </div>
              </div>

              {/* Stylish image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden">
                {/* Orange gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-90"></div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl"></div>

                {/* The image */}
                <img
                  src={women}
                  alt="Professional consultant"
                  className="object-cover object-top h-full w-full relative z-10"
                />

                {/* Optional floating tag at bottom */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm font-medium text-gray-800 shadow-md z-20">
                  Career Expert
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlacementSupport;
