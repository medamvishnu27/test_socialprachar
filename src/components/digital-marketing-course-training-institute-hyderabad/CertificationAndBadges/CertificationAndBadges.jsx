/** @format */
import React, { useState } from "react";
import g1 from "../../../assets/digitalMarketing/certifications/g-1.png";
import g2 from "../../../assets/digitalMarketing/certifications/g-2.png";
import g3 from "../../../assets/digitalMarketing/certifications/g-3.png";
import g4 from "../../../assets/digitalMarketing/certifications/g-4.png";
import g5 from "../../../assets/digitalMarketing/certifications/g-5.png";
import meta from "../../../assets/digitalMarketing/certifications/meta.png";
import hubspot from "../../../assets/digitalMarketing/certifications/hubspot.png";
import hootsuit from "../../../assets/digitalMarketing/certifications/hootsuit.png";
import semrush from "../../../assets/digitalMarketing/certifications/semrush.png";
import SP from '../../../assets/AssetsOfDetailsPage/masterclass/defaultcertificate.png';
import DMFormButton from "../DMForm/DMFormButton";


// Replace these with your actual certificate image URLs
const certifications = {
  Google: [
    {
      image: g1,
      completedOn: "May 14, 2022",
    },
    {
      image: g2,
      completedOn: "March 4, 2022",
    },
    {
      image: g3,
      completedOn: "May 14, 2022",
    },
    {
      image: g4,
      completedOn: "June 1, 2023",
    },
    {
      image: g5,
      completedOn: "June 1, 2023",
    },
  ],
  Meta: [
    {
      image: meta,
      completedOn: "June 1, 2023",
    },
  ],
  Hubspot: [
    {
      image: hubspot,
      completedOn: "June 1, 2023",
    },
  ],
  Social_Prachar: [
    {
      image:SP,
      completedOn: "June 1, 2023",
    },
  ],
  Semrush: [
    {
      image: semrush,
      completedOn: "June 1, 2023",
    },
  ],
};

const CertificationAndBadges = () => {
  const providers = Object.keys(certifications);
  const [selectedProvider, setSelectedProvider] = useState("Google");
  const [index, setIndex] = useState(0);

  const cards = certifications[selectedProvider];
  const cardsPerPage = 3;

  const handleNext = () => {
    if (index + cardsPerPage < cards.length) {
      setIndex(index + cardsPerPage);
    }
  };

  const handlePrev = () => {
    if (index - cardsPerPage >= 0) {
      setIndex(index - cardsPerPage);
    }
  };

  const visibleCards = cards.slice(index, index + cardsPerPage);

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-2">
          Earn 21 Certifications & Badges
        </h1>
        <p className="mb-6 text-gray-600">
          Boost your Career by adding 21+ Certifications on your resume from
          Global certifying partners like Google, Meta, Hubspot, etc.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-8">
          {providers.map((provider) => (
            <button
              key={provider}
              className={`px-4 py-2 rounded ${
                selectedProvider === provider
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 text-gray-800"
              }`}
              onClick={() => {
                setSelectedProvider(provider);
                setIndex(0);
              }}
            >
              {provider}
            </button>
          ))}
        </div>

        {/* Certification Carousel */}
        {cards.length > 0 ? (
          <div className="flex items-center justify-center gap-1">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="text-3xl px-2 disabled:opacity-30"
              disabled={index === 0}
            >
              ◀
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
              {visibleCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-2 rounded shadow-lg text-center h-full min-h-[280px] flex flex-col justify-between"
                >
                  <img
                    src={card.image}
                    alt={`Certification ${i}`}
                    className="w-full h-56 object-contain mb-4"
                  />
                  <p className="text-sm text-gray-500">
                    Completed on: {card.completedOn}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="text-3xl px-2 disabled:opacity-30"
              disabled={index + cardsPerPage >= cards.length}
            >
              ▶
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No certifications available yet.
          </p>
        )}

        <div className="max-w-6xl mx-auto p-8 bg-gray-50 font-sans">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Terms & Conditions:
          </h2>
          <ul className="list-disc space-y-4 text-gray-700">
            <li className="leading-relaxed">
              The cost of a Facebook Blueprint certification exam can range from
              $99 to $150, depending on the type of exam. The exact cost may
              vary by country.
            </li>
            <li className="leading-relaxed">
              If you fail the exam, you'll need to pay again for a reattempt.
            </li>
            <li className="leading-relaxed">
              The trainer will provide assistance during the exam. Neither the
              trainer nor Digital Nest is responsible for the successful
              completion of the exam.
            </li>
          </ul>
          <div className="flex justify-center mt-8">
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-12 rounded transition duration-300">
              Apply Today
            </button> */}
            <DMFormButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificationAndBadges;
