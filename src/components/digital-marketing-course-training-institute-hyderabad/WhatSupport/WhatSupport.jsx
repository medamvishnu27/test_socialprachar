/** @format */
"use client";
// import Image from "next/image";
import React, { useState } from "react";
import careerImg from "../../../assets/digitalMarketing/careerSupport.png";
import managerImg from "../../../assets/digitalMarketing/program_manager.png";
import mentorImg from "../../../assets/digitalMarketing/mentorship.png";
import DMFormButton from "../DMForm/DMFormButton";

const WhatSupport = () => {
  const [activeTab, setActiveTab] = useState("career");
  const supportContent = {
    career: {
      title: "Career Support Team",
      image: careerImg,
      description: "Our career support team at Social Prachar conducts",
      points: [
        "A comprehensive SWOT analysis for learners",
        "Assists in crafting resumes and optimizing LinkedIn profiles",
        "Provides training in soft skills and personality development",
        "Facilitates group discussions, JAM sessions, and conducts personal interviews",
      ],
    },
    mentorship: {
      title: "Mentorship Support",
      image: mentorImg,
      description:
        "Our experienced mentors provide guidance throughout your learning journey",
      points: [
        "One-on-one mentoring sessions with industry experts",
        "Regular feedback on projects and assignments",
        "Career path guidance and industry insights",
        "Networking opportunities with professionals",
      ],
    },
    manager: {
      title: "Dedicated Program Manager",
      image: managerImg,
      description: "Your program manager ensures smooth learning experience",
      points: [
        "Tracks your progress throughout the program",
        "Schedules sessions and coordinates with instructors",
        "Addresses concerns and provides timely solutions",
        "Ensures personalized attention throughout your journey",
      ],
    },
  };

  const tabs = Object.keys(supportContent).map((id) => ({
    id,
    title: supportContent[id].title,
    image: supportContent[id].image,
  }));

  const activeContent = supportContent[activeTab];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-start md:text-left relative">
          What support you'll get from Social Prachar?
          <span className="absolute -bottom-3 left-0 w-20 h-1 bg-blue-600 hidden md:block"></span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation - Enhanced */}
          <div className="w-full md:w-72 flex flex-col gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-6 text-left rounded-lg transition-all duration-300 flex items-center ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    activeTab === tab.id ? "bg-white" : "bg-blue-600"
                  }`}
                ></div>
                <div className="font-medium">{tab.title}</div>
              </button>
            ))}
          </div>

          {/* Content Area - Improved */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Container with better fitting */}
              <div className="lg:w-1/2 h-64 lg:h-auto relative">
                <img
                  src={activeContent.image || "/api/placeholder/600/600"}
                  alt={activeContent.title}
                  className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
                />
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
              </div>

              {/* Content Container */}
              <div className="lg:w-1/2 p-6 lg:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {activeContent.title}
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  {activeContent.description}
                </p>
                <ul className="space-y-4">
                  {activeContent.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center md:justify-center">
          <DMFormButton />
        </div>
      </div>
    </div>
  );
};
export default WhatSupport;
