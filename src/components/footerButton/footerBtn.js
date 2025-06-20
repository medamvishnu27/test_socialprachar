import React, { useEffect, useState, useCallback } from 'react';
import FooterBtnCSS from './footerBtn.module.css';

function FooterBtn() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    if (scrollTop > viewportHeight / 2) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {showButton && (
        <button
          className={FooterBtnCSS.scrollButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span>&#10095;&#10095;</span>
        </button>
      )}
    </div>
  );
}

export default FooterBtn;
