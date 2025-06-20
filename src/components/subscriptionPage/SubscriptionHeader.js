    import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import FourthPart from './FourthPart';
import Footer from './../footer/footer';
import Accordian from './Accordian';
import Google from './Google';
import Linkedin from './Linkedin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FaRobot, FaRupeeSign } from 'react-icons/fa';
import style from '../Career_workshop/ButtonDemoBooking/Button.module.css';
import RegisterForm from './FormButton';
import JD_course from '../../assets/AssetsOfDetailsPage/JD_course.png';
import { useParams } from 'react-router-dom';
import { useDateContext } from '../Forms/DateContext';



function formatDateWithSuffix(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-IN", { month: "long" });
    const year = date.getFullYear();

    const getOrdinalSuffix = (n) => {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

const SubscriptionHeader = () => {
    const {careerWorkshopDate} = useDateContext();
    const formattedWorkshopDate = formatDateWithSuffix(careerWorkshopDate);

    const { userType } = useParams();
    console.log("User Type:", userType); 
    const displayText = userType === "students" ? "Students can" : "Working Professionals";
    const changePlan = userType === "students" ? " Starting From 25,000 INR" :" Starting From 12,000 INR";

    return (
        <>
            <div className="container mt-5">
                <div className="row align-items-center">
                    <div className="text-center">
                        <h1 className="fw-bold col-md-10 mx-auto">
                            Upskill Yourself with <span style={{ color: '#ff5003' }}>Hyderabad’s #1 Subscription-Based</span> Learning Plan!
                        </h1>
                    </div>

                    <div className="row align-items-center px-3 px-md-5 py-4">
                        {/* Left Content Section */}
                        <div className="col-12 col-md-6 mb-4 mb-md-0">
                            <h2 className="fw-bold" style={{ color: '#2c2c2c' }}>
                                {displayText} <span style={{ color: '#ff5003' }}>Save 95%</span> with SocialPrachar's Subscription Plan!
                            </h2>
                            <p>
                                To give students the <span className='fw-bold text-lg'>Freedom to master multiple </span> high-demand skills  under one  affordable fee and  become eligible for more job roles  
                                <span className='fw-bold text-lg'>-without being  limited to just one course.</span>
                            </p>
                            <h4 className="py-3" style={{ color: '#443cdf' }}>
                                <FontAwesomeIcon icon={faTags} className="px-2" />
                                One Subscription – Learn Multiple Courses!
                            </h4>
                            {/* <p>
                                Get unlimited access to <span className="fw-bold">Full Stack Development, Data Science, AI, Cloud, and more</span> with SocialPrachar's <span className="fw-bold">all-in-one subscription.</span>
                                Gain hands-on experience, expert mentorship, and AI-powered career tools—all at an unbeatable price!
                            </p> */}
                            <p className="fw-bold d-flex">
                                <FaRobot className="me-2" size={20} /> Exclusive AI-driven tools & career support included!
                            </p>
                            <p className="fw-bold d-flex">
                                <FaRupeeSign className="me-2" size={20} />   
                                 {changePlan}
                            </p>
                            <p>
                                Invest in your future—One Subscription, <span className="fw-bold " style={{ color: '#ff5003' }}>Unlimited Learning!</span>
                            </p>
                            <div className="text-center">
                                <RegisterForm label={"Book Free Demo Now"} className={`${style.button} my-3 fw-bold`} />
                                <p className="fw-bold" style={{ fontSize: '18px' }}>
                                    Register by <span style={{ color: '#4941e1', fontSize: '22px' }}>{formattedWorkshopDate}</span> to unlock exclusive bonuses
                                </p>
                            </div>
                        </div>

                        {/* Right Image Section */}
                        <div className="col-12 col-md-6 text-center">
                            <img
                                src={JD_course}
                                alt="Subscription Course"
                                className="img-fluid rounded"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "15px",
                                    background: "black" 
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <SecondPart />
            <ThirdPart />
            <FourthPart />
            <Linkedin />
            <Google />
            <Accordian />
            <Footer />
        </>
    );
};

export default SubscriptionHeader;
