import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ParallaxEffect = ({ images }) => {
  const parallaxRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Safely check if all elements in the parallaxRef exist
      if (parallaxRef.current && parallaxRef.current.length > 0) {
        parallaxRef.current.forEach((move) => {
          if (move) {  // Make sure the element exists
            const movingValue = move.getAttribute('data-value');
            if (movingValue) {  // Ensure movingValue exists
              const x = (e.clientX * movingValue) / 250;
              const y = (e.clientY * movingValue) / 250;
              move.style.transform = `translateX(${x}px) translateY(${y}px)`;
            }
          }
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="parallax-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          className={image.className}
          data-value={image.dataValue}
          alt={image.alt}
          ref={(el) => (parallaxRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

ParallaxEffect.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      dataValue: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
};

export default ParallaxEffect;
