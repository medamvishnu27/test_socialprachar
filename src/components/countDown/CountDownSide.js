import React, { useEffect, useState } from 'react';
import CountDownCSS from './CountDown.module.css';


const CountDownSide = () => {
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show the popup when the component mounts
        setShowPopup(true);

        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(countdownInterval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);


        // Cleanup interval on component unmount
        return () => clearInterval(countdownInterval);
    }, []);

    // Format time into mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (!showPopup) return null;


    const handleCancelClick = () => {
        setShowPopup(false);
    };

    return (
        <div className={CountDownCSS.popupCard}>
            <button className={CountDownCSS.CancelButton} onClick={handleCancelClick}>X</button>
            <div className={CountDownCSS.popupContent}>
                <span className={CountDownCSS.icon}>🔔</span>
                <h1>OFFER</h1>
                <p>Get Exclusive 5000 OFF, Only For YOU !!</p>
                <h3>Time Left: {formatTime(timeLeft)}</h3>
            </div>
        </div>
    );
};

export default CountDownSide;