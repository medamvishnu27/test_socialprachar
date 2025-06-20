import React, { useEffect, useState } from 'react';
import clock from '../../../assets/careerworkshop/3d-alarm.png';
import style from './BannerStyle.module.css';

const Banner = () => {

    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const [showBanner, setShowBanner] = useState(false);
     // Timer
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
    
            return () => clearInterval(timer);
        }, []);
    
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, "0")}`;
        };


    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

            if (scrollPercentage > 35) {
                setShowBanner(true);
            } else {
                setShowBanner(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
      <>
            {showBanner && (
                <div className={style.banner_container}>
                <div className="d-flex justify-content-around align-items-center">
                    <div>
                        <div className='d-flex align-items-center'>
                            <p className={style.bannerText}>
                                Free
                            </p>
                            <span className="text-decoration-line-through" style={{ color: 'white', fontSize: '18px', position: 'relative', top: '-3px', left: '6px' }}>₹999</span>
                        </div>
                        <div className='d-flex flex-row'>
                            <img src={clock} alt="" style={{ width: '25px', height: '25px' }} />
                            <p className='px-2' style={{ fontSize: '20px', fontWeight: '600' }}>Offer Ends in <span>{formatTime(timeLeft)}</span> Mins</p>
                            <img src={clock} alt="" style={{ width: '25px', height: '25px' }} />
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn fw-bold text-uppercase px-4 py-2"
                            style={{
                                borderRadius: '50px',
                                fontSize: '18px',
                                color: 'black',
                                background: '#ffd702',

                            }}
                        >
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        )}
      </>
    );
};

export default Banner;