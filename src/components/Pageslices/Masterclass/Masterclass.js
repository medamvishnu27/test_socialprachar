import React, { useEffect, useState } from 'react';
import styles from './Masterclass.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { data } from './../../Cards/CardData';
import Buttonstyle from '../Enrollbutton/Enrollbutton.module.css';
import SignInForm from '../Enrollbutton/PopupSignInForm';


const Masterclass = () => {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [courseID, setCourseID] = useState(null);
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    useEffect(() => {
        const cardDetails = data.find(card => card.slug === slug);
        setCard(cardDetails);
        setCourseID(cardDetails.courseID);
    }, [slug]);

    // Event date calculation and setting
    useEffect(() => {
        const savedEventDate = localStorage.getItem('eventDate');
        let eventDate;

        if (savedEventDate) {
            eventDate = new Date(savedEventDate);
        } else {
            eventDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            localStorage.setItem('eventDate', eventDate);
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            // Countdown finished
            if (distance < 0) {
                const newEventDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                localStorage.setItem('eventDate', newEventDate);
                eventDate = newEventDate;
                return;
            }

            // Calculate time left
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.masterClassContent}>

            <div className={styles.nextLive}>
                <h2>Next <span style={{ color: '#ff5003' }}>cohort</span> Starts in</h2>
                <div className={styles.timerBoxes}>
                    <div className={styles.timerBox}>
                        <div className={styles.timeCount}>{timeLeft.days}</div>
                        <div>Days</div>
                    </div>
                    <div className={styles.timerBox}>
                        <div className={styles.timeCount}>{timeLeft.hours}</div>
                        <div>Hours</div>
                    </div>
                    <div className={styles.timerBox}>
                        <div className={styles.timeCount}>{timeLeft.minutes}</div>
                        <div>Minutes</div>
                    </div>
                    <div className={styles.timerBox}>
                        <div className={styles.timeCount}>{timeLeft.seconds}</div>
                        <div>Seconds</div>
                    </div>
                </div>
                <div className='pt-5'>
                    <h2>
                        Skill Up Now, Pay in Easy Installments! –
                        <span style={{ color: '#ff5003' }}>
                            {courseID === 8 ? "" : courseID === 1 ? "₹3,500/month EMIs" : "₹2,999/month EMIs"}
                        </span>
                        <button className={`${Buttonstyle.shinebtn} btn`} onClick={togglePopup}>
                            Get Details
                        </button>
                    </h2>
                    {isPopupVisible && <SignInForm onClose={togglePopup} actionType="Button:pricing Details" />}
                </div>
            </div>
        </div>
    );
};

export default Masterclass;
