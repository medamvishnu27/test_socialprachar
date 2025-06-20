/** @format */

"use client";
import React, { useState } from "react";

const DMForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    mode: "",
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    actionType: "Digital Marketing",
    timestamp: new Date().toISOString(), 
  });

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyiFH6YnpFoN2CeaCSOIB5Uv0667e_H3u183xrWTeK95GHV7iUBO1TPn40C6ydXYME2/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.course ||
      !formData.mode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    try {
      const formPayload = new FormData();

      // Append existing form data to payload
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formPayload,
      });

      setIsLoading(false);
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          course: "",
          mode: "",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          actionType: "Form Submission",
          sheetName: "DM_Form",
          timestamp: new Date().toISOString(),
        });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error("Form error:", err);
      setIsLoading(false);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded relative text-black">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <span className="text-lg font-semibold">Submitting...</span>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-black mb-6">
        APPLY NOW
      </h2>
      <form
        onSubmit={handleSubmit}
        className={isLoading ? "opacity-50 pointer-events-none" : ""}
      >
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-600 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-600 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="w-20 border border-gray-300 rounded-l p-2 bg-gray-100 text-center">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="flex-1 border border-l-0 border-gray-300 rounded-r p-2"
            />
          </div>
        </div>

        {/* Course */}
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-600 mb-1">
            Select Course
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="CourseType" disabled>CourseType</option>
            <option value="Executive Program">3 Months Course</option>
            <option value="Certificate Course">3 Months Course + Internship</option>
          </select>
        </div>

        {/* Mode */}
        <div className="mb-4">
          <label htmlFor="mode" className="block text-gray-600 mb-1">
            Select Mode of Training
          </label>
          <select
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DMForm;
