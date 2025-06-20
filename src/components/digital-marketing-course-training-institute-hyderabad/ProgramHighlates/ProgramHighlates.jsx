/** @format */

import { Star } from "lucide-react";
import React from "react";
import profile from '../../../assets/careerworkshop/girlImage.png';
import ApplyButton from "../DMForm/DMFormButton";

const highlights = [
  "Curriculum Designed & Taught By IIM Alumni",
  "1 on 1 Student Mentorship",
  "Practical Training using case studies",
  "Network With Alumni Using Our Portal",
  "100% Job & Internship Guarantee Program",
  "Work On Real Time Projects",
  "Get 21+ Certifications From Google, Bing, Meta Etc",
  "Dedicated Career Assistance Team",
  "Life Time Access To LMS Portal",
  "Assignments & Assessments",
  "Training by Entrepreneurs & Industry Experts",
];

const ProgramHighlates = () => {
  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
          Program Highlights
        </h2>

        <p className="text-gray-600 mb-8 sm:mb-10 max-w-3xl text-sm sm:text-base">
          Digital Nest established in 2012, has rich experience in designing the
          curriculum that industry is in need. Entire program is taught by using
          various case studies, assignments and assessments.
        </p>

        <div className="d-flex flex-wrap">
          <div className="lg:w-3/5">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="pt-1">
                  <Star
                    fill="#3b82f6"
                    color="#3b82f6"
                    size={20}
                    className="flex-shrink-0"
                  />
                </div>
                <p className="text-gray-800 text-sm leading-relaxed font-bold">
                  {highlight}
                </p>
              </li>
            ))}
          </div>

          <div className="w-full lg:w-2/5 flex justify-center items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <img
                src={profile}
                alt="Professional with headset"
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex items-center justify-center mt-10">
          <ApplyButton />
        </div>
      </div>

      <div className="px-2 pt-6 max-w-6xl mx-auto text-start">
        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">
          Digital Marketing Course In Hyderabad, India
        </h3>
        <p className="text-gray-600 leading-relaxed text-base md:text-m">
          Digital Marketing Course with{" "}
          <span className="font-semibold">100% Placement Program</span> consists
          of SEO Training, Google AdWords Training, Social Media Marketing,
          Email Marketing, Affiliate Marketing, Google Analytics &amp; 360
          Degree Implementation. <br className="hidden md:block" />
          We offer flexible training modes including{" "}
          <span className="font-semibold">Classroom Training</span> at KPHB –
          Hyderabad, India,{" "}
          <span className="font-semibold">Online Live Sessions</span>, and{" "}
          <span className="font-semibold">E-learning</span> through recorded
          trainer videos available anytime.
        </p>
      </div>
    </section>
  );
};

export default ProgramHighlates;
