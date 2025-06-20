/** @format */
"use client"
import React, { useState } from "react";
import a1 from "../../../assets/digitalMarketing/a-1.png";
import b1 from "../../../assets/digitalMarketing/b-1.png";
import c1 from "../../../assets/digitalMarketing/c-1.png";
import d1 from "../../../assets/digitalMarketing/d-1.png";
import e1 from "../../../assets/digitalMarketing/e-1.png";
import f1 from "../../../assets/digitalMarketing/f-1.png";
// import Image from "next/image";
import DMForm from "../DMForm/DMForm";

const features = [
  {
    image: a1,
    title: "Interactive Learning",
    description:
      "All the Courses taught by us are Interactive, with Limited strength in a batch we make sure that you get the best experience",
  },
  {
    image: b1,
    title: "Dedicated Placement Officer & Job Portal",
    description:
      "We conduct Mock Interviews and Screen CV’s to make you industry ready. We have a unique job portal disclosing all the job listings posted by the recruiter",
  },
  {
    image: c1,
    title: "Network with Alumni",
    description:
      "Digital Nest has over 6000+ alumnus working with various Organizations. We have a Networking app to connect with the alumni as well",
  },
  {
    image: d1,
    title: "Dedicated Program Manager",
    description:
      "We have a dedicated Program Manager who will Constantly take feedback, for the Students to have a better learning experience",
  },
  {
    image: e1,
    title: "World Class Learning Management System",
    description:
      "Digital Nest has built a Software for students to learn using LMS. Students can download material and freely access all the live and Recorded sessions with no hassle",
  },
  {
    image: f1,
    title: "Case Studies, Material, Assignments & Assessments",
    description:
      "All our courses are not just Theoretical, We teach using Practical methods such as Simulation Exercises, Projects, Assessments etc",
  },
];

const DigitalNest = () => {
  const [showModal, setShowModal] = useState(false);

  const handleViewMoreClick = () => {
    setShowModal(true); // Show the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 pr-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Social Prachar
          </h1>
          <h2 className="text-4xl font-bold text-gray-700 mb-6">Advantage</h2>
          <div className="w-16 h-1 bg-blue-600 mb-8"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-6">
            Have a Great Journey of Learning at Social Prachar
          </h3>
          <p className="text-gray-600 mb-8">
            Our Courses are taught by Real time Industry Experts with latest
            teaching tools and techniques, Our LMS and dedicated Support manager
            are Key Important aspects that make learning easy and simple.
          </p>
          <button
            onClick={handleViewMoreClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 inline-flex items-center transition duration-300"
          >
            Start Learning
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
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
        </div>

        <div className="lg:w-2/3 mt-12 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col h-full"
              >
                <div className="flex mb-4">
                  <div className="text-blue-500 mr-4">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-14 h-10"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalNest;
