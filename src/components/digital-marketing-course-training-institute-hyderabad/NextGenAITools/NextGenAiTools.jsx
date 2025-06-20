/** @format */
"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
import img1 from "../../../assets/digitalMarketing/bootpress.png";
import img2 from "../../../assets/digitalMarketing/chatfuel.png";
import img3 from "../../../assets/digitalMarketing/copy.ai.png";
import img4 from "../../../assets/digitalMarketing/onesignal.png";
import img5 from "../../../assets/digitalMarketing/quotex.png";
import img6 from "../../../assets/digitalMarketing/slides.ai.png";
import img7 from "../../../assets/digitalMarketing/beacons.png";
import img8 from "../../../assets/digitalMarketing/chatgpt.png";
import img9 from "../../../assets/digitalMarketing/boat.png";
import img10 from "../../../assets/digitalMarketing/bard.png";
import img11 from "../../../assets/digitalMarketing/julius.png";
import img12 from "../../../assets/digitalMarketing/nightcafe.png";
import img13 from "../../../assets/digitalMarketing/panther.png";
import img14 from "../../../assets/digitalMarketing/diamond.png";
import img15 from "../../../assets/digitalMarketing/writesonic.png";
import DMForm from "../DMForm/DMForm";


const tools = [
  { id: 1, logo: img1 },
  { id: 2, logo: img2 },
  { id: 3, logo: img3 },
  { id: 4, logo: img4 },
  { id: 5, logo: img5 },
  { id: 6, logo: img6 },
  { id: 7, logo: img7 },
  { id: 8, logo: img8 },
  { id: 9, logo: img9 },
  { id: 10, logo: img10 },
  { id: 11, logo: img11 },
  { id: 12, logo: img12 },
  { id: 13, logo: img13 },
  { id: 14, logo: img14 },
  { id: 15, logo: img15 },
];



const NextGenAiTools = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const carouselRef = useRef(null);

  // Update visible count based on screen size
  const updateVisibleCount = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      setVisibleCount(width < 768 ? 3 : width < 1024 ? 5 : 8);
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Create a doubled array for smoother infinite scrolling
  const extendedTools = [...tools, ...tools];

  // Function to handle next slide
  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // Reset to start when reaching the end of original array
      if (nextIndex >= tools.length) {
        // Use setTimeout to avoid visual jump
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(0);
        }, 0);
        return tools.length;
      }
      setTimeout(() => setIsAnimating(false), 300);
      return nextIndex;
    });
  };

  // Function to handle previous slide
  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      // Reset to end when reaching the start
      if (nextIndex < 0) {
        // Use setTimeout to avoid visual jump
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(tools.length - 1);
        }, 0);
        return -1;
      }
      setTimeout(() => setIsAnimating(false), 300);
      return nextIndex;
    });
  };

  // Auto-scroll effect with interval
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, isAnimating]);

  // Calculate transform position for smooth scroll
  const getTransformValue = () => {
    const itemWidth = 150; // Approximate width of each item including margins
    return `translateX(-${currentIndex * itemWidth}px)`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-left self-start mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-0">
          Next Gen
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          AI Tools
        </h2>
      </div>

      <div
        className="relative w-full mb-8 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={carouselRef}
      >
        {/* Left Arrow */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          onClick={handlePrev}
          disabled={isAnimating}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Container */}
        <div className="flex justify-center overflow-hidden mx-12">
          {/* Carousel Track */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: getTransformValue() }}
          >
            {extendedTools.map((tool, index) => (
              <div
                key={`${tool.id}-${index}`}
                className="mx-5 flex flex-col items-center justify-center flex-shrink-0"
              >
                <img
                  src={tool.logo}
                  alt="image logo"
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          onClick={handleNext}
          disabled={isAnimating}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-4 w-full max-w-md mx-auto">
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white font-medium py-3 px-4 rounded w-full hover:bg-blue-700 transition-colors"
        >
          Apply Today
        </button>

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[10000]">
            <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 relative">
              {/* Close button */}
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
  );
};

export default NextGenAiTools;
