import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import footerStyle from "./footer.module.css";
import footerImg from "../../assets/footer2_cta_image.png";
import spLogo from '../../assets/SP_Logo.png';
import ParallaxEffect from '../extraComponents/ParallaxEffect.js';
import googlePlay from '../../assets/google_play.svg';
import AppleStore from '../../assets/app_store.svg';
import wavesPic from '../../assets/waves.png';
import BookSvg from '../../assets/book.png';
import whiteBulb from '../../assets/whiteBulb.png';
import style from '../Pageslices/Enrollbutton/Enrollbutton.module.css';


const Footer = () => {
    const navigate = useNavigate();

    const images = [
        { src: wavesPic, className: 'objectOne', dataValue: '5', alt: 'Waves Image' },
        { src: BookSvg, className: 'objectTwo', dataValue: '5', alt: 'Book Image' },
    ];

    const iconsArray = [
        { icon: <i className="bi bi-facebook"></i>, iconLink: 'https://www.facebook.com/socialprachar/' },
        { icon: <i className="bi bi-instagram"></i>, iconLink: 'https://www.instagram.com/socialprachar_institute/' },
        { icon: <i className="bi bi-linkedin"></i>, iconLink: 'https://www.linkedin.com/company/6635034/admin/dashboard/' },
        { icon: <i className="bi bi-youtube"></i>, iconLink: 'https://youtube.com/@socialprachar?si=jPmucrBrLin2Ppu6' },
        { icon: <i className="bi bi-twitter-x"></i>, iconLink: 'https://x.com/i/flow/login?redirect_after_login=%2Fsocial_prachar' },
    ];

    const OfficeDetails = [
        <b>Head Office:</b>,' #301, 3rd Floor, ', 'Sathyabhama Commercial Complex, ', 'BhagyaNagar Colony, ', 'KPHB, Hyderabad.', 'KPHB, Hyderabad - 500072', 'Contact: +91-8019 479 419',
        <div>

            <div className="container mt-3">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        className="embed-responsive-item"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.453265774153!2d78.3910161!3d17.491839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f20663c46d%3A0x846796db82f76735!2sSocial%20Prachar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

        </div>
    ];

    const TrainingCenter = [
        <b>Training Centers:</b>, '#301, 3rd Floor,', 'Sathyabhama Commercial Complex,', 'BhagyaNagar Colony,', 'KPHB, Hyderabad .', '#502, 5th Floor,', 'Sathyabhama Commercial Complex,', 'BhagyaNagar Colony,', 'KPHB, Hyderabad - 500072.', 'Contact: +91-8019 479 419'
    ];

    const QuickLinks = [
        { name: 'Full Stack Web Development', path: '/full-stack-developer-course' },
        { name: 'AWS + DevOps', path: '/awsdevopscourse' },
        { name: 'Data Science + AI', path: '/data-science' },
        { name: 'Digital Marketing', path: '/digital-marketing-course-training-institute-hyderabad/' },
        { name: 'Privacy Policy', path: '/privacy-policy' }
    ];

    const NavToAppleStore = () => {
        window.open(`https://apps.apple.com/us/app/classplus/id1324522260`, "_blank");
    }

    const NavToPlayStore = () => {
        window.open(`https://play.google.com/store/apps/details?id=co.diy7.vjaau&hl=en_IN`, "_blank");
    }

    const navigateToSocial = (iconLink) => {
        window.open(iconLink, "_blank");
    };

    const handleNavigate = (path) => {
        navigate(path); // Use navigate to change the route
    };

    return (
        <>
            <div className="container-fluid footerHover">
                {/* Footer certificate */}
                <ParallaxEffect images={images} />
                <div>
                    <div className={`row row-cols-sm-12 row-gap-5 py-3 ${footerStyle.footerCertificate}`}>
                        <div className={`col ${footerStyle.certificateText}`}>
                            <div className="d-block">
                                <span className={`d-flex ms-1 ${footerStyle.whiteBulb}`}>
                                    <img src={whiteBulb} />
                                    <h4>Learn On The Go</h4>
                                </span>
                                <p>
                                    Build your Skills For Better Tomorrow<br /> Learn Till You Get Placed
                                </p>
                                <div className={`${footerStyle.StoreBtns}`}>
                                    <img src={AppleStore} className={footerStyle.AppleStore} onClick={NavToAppleStore} />
                                    <img src={googlePlay} onClick={NavToPlayStore} />
                                </div>
                            </div>
                        </div>

                        <div className={`col  ${footerStyle.certificateImg}`} id={`${footerStyle.certificateImg}`}>
                            <img src={footerImg} />
                        </div>
                    </div>

                    {/* Footer Lists */}
                    <div className={`row ${footerStyle.fotterList}`}>
                        {/* First Column */}
                        <div className="col-12 col-md-3">
                            <div className={footerStyle.spLogo}>
                                <img src={spLogo} alt="SP Logo" />
                            </div>
                            <p>
                                SocialPrachar, founded by an IIM alumnus, is a leading EdTech company with 10+ years of expertise. We’ve trained 16,000+ students and achieved a 95% placement success rate with packages.
                                Offering cutting-edge programs in Full Stack, Data Science, AI, and Cloud.
                            </p>
                            <div className="d-flex gap-4">
                                {iconsArray.map((iconItem, i) => (
                                    <div className={footerStyle.mediaIcon} key={i} onClick={() => navigateToSocial(iconItem.iconLink)}>
                                        {iconItem.icon}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Second Column - Office Details */}
                        <div className="col-12 col-md-3">
                            {OfficeDetails.map((detail, i) => (
                                <div className={footerStyle.useFullLink} key={i}>{detail}</div>
                            ))}
                        </div>

                        {/* Third Column - Training Center */}
                        <div className="col-12 col-md-3">
                            {TrainingCenter.map((detail, i) => (
                                <div className={footerStyle.Explore} key={i}>{detail}</div>
                            ))}
                        </div>

                        {/* Fourth Column - Quick Links */}
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                            <b>Job Guarantee Programs</b>
                            <div>
                                {QuickLinks.map((link, i) => (
                                    <div className={`${footerStyle.Explore}`} key={i} onClick={() => handleNavigate(link.path)}>
                                        {link.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Footer Copyright */}
            <div div className={footerStyle.copyRight} >
                <p>Copyright © 2025 All Rights Reserved by Social Prachar</p>
            </div >
        </>
    );
};

export default Footer;
