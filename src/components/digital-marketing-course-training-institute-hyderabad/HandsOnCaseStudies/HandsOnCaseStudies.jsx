/** @format */
"use client"
import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
// import Image from "next/image";
import DMForm from "../DMForm/DMForm";

const caseStudies = [
  {
    logo: "", // Logo removed
    logoAlt: "",
    title: "How Nykaa Dominated Beauty E-Commerce in India",
    description:
      "Explore how Nykaa leveraged influencer marketing, content strategy, and omnichannel marketing to become a beauty retail giant.",
  },
  {
    logo: "",
    logoAlt: "",
    title: "Zomato’s Witty Social Media Game",
    description:
      "Discover how Zomato built a unique brand voice through memes, trending content, and high customer engagement.",
  },
  {
    logo: "",
    logoAlt: "",
    title: "Nike’s Personalized Email Campaigns",
    description:
      "See how Nike used segmentation, dynamic content, and emotional branding to create impactful email campaigns.",
  },
  {
    logo: "",
    logoAlt: "",
    title: "Airbnb's SEO Strategy",
    description:
      "Uncover how Airbnb mastered localized SEO, user-generated content, and long-tail keyword strategies to dominate search rankings.",
  },
  {
    logo: "",
    logoAlt: "",
    title: "How Starbucks Used Mobile App Marketing",
    description:
      "Learn how Starbucks boosted customer loyalty through app-based rewards, personalized offers, and push notifications.",
  },
];



const capstoneProjects = [
  {
    title: "Product Launch Campaign",
    description: "A D2C skincare brand launching a new anti-pollution serum.",
  },
  {
    title: "SEO Revamp for a Local Business",
    description:
      "Improved the online presence of a local car service and detailing garage.",
  },
  {
    title: "YouTube Content Strategy",
    description:
      "Developed a content roadmap for a wellness YouTube brand targeting Gen Z and Millennials.",
  },
  {
    title: "Social Media Campaign for an Event",
    description:
      "Crafted a 3-day campaign strategy for a music, art, and tech fest in Bengaluru.",
  },
  {
    title: "Email Funnel for an eCommerce Store",
    description:
      "Designed an engaging email funnel for an eco-friendly home decor brand.",
  },
  {
    title: "Mobile App Retention Strategy",
    description:
      "Strategized retention efforts for a food delivery app offering healthy snacks.",
  },
  {
    title: "Influencer Marketing Project",
    description:
      "Planned micro-influencer collaborations for a sustainable fashion brand.",
  },
  {
    title: "Travel Blog/SEO Content Strategy",
    description:
      "Created SEO-optimized blog content for a solo travel experience platform.",
  },
  {
    title: "Healthcare Digital Presence Project",
    description:
      "Enhanced the digital footprint of a wellness clinic chain offering alternative medicine.",
  },
  {
    title: "Online Ordering Campaign for Food Business",
    description:
      "Boosted online orders for a gourmet pizza brand in Hyderabad and Bangalore.",
  },
];


const HandsOnCaseStudies = () => {
  const [activeTab, setActiveTab] = useState("caseStudies");
    const [showModal, setShowModal] = useState(false);

    const handleViewMoreClick = () => {
      setShowModal(true); // Show the modal when the button is clicked
    };

    const handleCloseModal = () => {
      setShowModal(false); // Hide the modal
    };

  return (
    <section
      id="case-studies"
      className="py-8 md:py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <article className="text-start mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hands On Case Studies and Projects
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">
            Get hands-on case studies & projects from{" "}
            <span className="font-semibold">
              NETFLIX | McDONALD'S | UBER | AIRBNB | WHO | SPOTIFY | ZOMATO |
              FORBES
            </span>
          </p>
        </article>

        {/* Tabs - Improved for mobile */}
        <div className="flex justify-start mb-8">
          <div className="inline-flex rounded-full shadow-sm bg-gray-100 p-1">
            <button
              className={`py-2 px-4 md:px-6 text-sm md:text-base rounded-full transition-all duration-300 ${
                activeTab === "capstoneProjects"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("capstoneProjects")}
            >
              Capstone Projects
            </button>
            <button
              className={`py-2 px-4 md:px-6 text-sm md:text-base rounded-full transition-all duration-300 ${
                activeTab === "caseStudies"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("caseStudies")}
            >
              Case Studies
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(activeTab === "caseStudies" ? caseStudies : capstoneProjects).map(
              (item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-4 md:p-6 rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h5 className="font-semibold text-gray-800 md:text-m mb-2">
                      {item.title}
                    </h5>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* View More Button */}
        <div>
          {/* View More Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMoreClick}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 md:px-10 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2"
            >
              <span>View More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Modal for DMForm */}
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
      </div>
    </section>
  );
};

export default HandsOnCaseStudies;
