import React, { useState, useEffect } from 'react';
import style from './Banner.module.css';
import { data } from '../../Cards/CardData';
import { useParams } from 'react-router-dom';
import SignInForm from '../Enrollbutton/PopupSignInForm';
import EnrollButton from '../Enrollbutton/Enrollbutton';
import fullStackImage from '../../../assets/classplus-banner-fullstack.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Buttonstyle from '../Enrollbutton/Enrollbutton.module.css';

const Banner = () => {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);


    useEffect(() => {
        const cardDetails = data.find(item => item.slug === slug);
        setCard(cardDetails);
    }, [slug]);


    if (!card) {
        return <div>Loading...</div>;
    }
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className={style.banner}>
            <div className={style.bannerContent}>
                <div className={style.bannerInfo}>
                    <img
                        loading="lazy" 
                        src={fullStackImage}
                        alt='banner_image'
                        className={style.bannerImage}
                    />
                    <div className={style.bannerText}>
                        <h2>{card.bannerHeader}</h2>
                        <p>{card.bannerStudentsEnrolled}</p>
                    </div>
                </div>
                <div className={`${style.bannerPrice}`}>
                    <span className={style.originalPrice}>Unlock Exclusive OFFERS<p>Almost Full <span className={style.offerText}>Only 5 Slots Left!</span></p></span>
                </div>
                <button
                    className={`px-3 btn btn-primary d-flex align-items-center justify-content-center ${Buttonstyle.shinebtn}`}
                    onClick={togglePopup}
                >
                    Curriculum
                    <FontAwesomeIcon icon={faDownload} className="" />
                </button>


            </div>
            {isPopupVisible && <SignInForm onClose={togglePopup} actionType="Button:Download Curriculum" />}
        </div>
    );
};

export default Banner;
