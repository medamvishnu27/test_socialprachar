/** @format */

"use client";
import React, { useState } from "react";
import DMForm from "./DMForm";

const DMFormButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => setIsFormVisible((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleForm}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
      >
        Apply Today
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>

      {isFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[10000]">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
            {/* Updated position of the close button */}
            <button
              onClick={toggleForm}
              className="absolute top-2 right-5 text-gray-600 hover:text-black z-[1010]"
            >
              ✕
            </button>
            <DMForm />
          </div>
        </div>
      )}
    </>
  );
};

export default DMFormButton;
