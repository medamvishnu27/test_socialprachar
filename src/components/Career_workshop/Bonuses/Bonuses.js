import React from 'react';
import style from './Bonuses.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import Button from '../ButtonDemoBooking/Button.js';

const Bonuses = () => {
    const items = [
        { text: 'You’re struggling to figure out where to start your career journey.' },
        { text: 'You’re applying to jobs but not receiving interview calls or responses.' },
        { text: 'You feel stuck in a cycle of self-doubt and lack direction in your job search.' },
        { text: 'You’re unsure how to choose a career path that aligns with your skills and interests.' },
        { text: 'You’ve tried learning new skills, but they’re not translating into job opportunities.' },
        { text: 'You feel overwhelmed and lack balance between your personal growth and career planning.' },
    ];

    const offerings = [
        {
            title: "100+ Resume Templates",
            price: "499",
            description: "Access a curated collection of professionally designed resume templates",
        },
        {
            title: "8-Year Career Roadmaps for In-Demand Tech Roles",
            price: "1999",
            description: "Detailed career planning guides for roles like Full Stack Developer, Data Scientist, AI Engineer, and Cloud Architect to help you visualize your long-term growth.",
        },
        {
            title: "Free 30-Minute 1:1 Career Consultation",
            price: "999",
            description: "Get personalized career guidance and answers to your specific questions.",
        },
        {
            title: "Exclusive Access to Industry-Ready Projects",
            price: "499",
            description: "Download templates and case studies for real-world projects in tech roles to enhance your portfolio and skill set.",
        },
        {
            title: "Guide to Building a LinkedIn Profile That Stands Out",
            price: "499",
            description: "Step-by-step instructions to optimize your LinkedIn profile, including tips on headlines, summaries, and connecting with recruiters.",
        },
        {
            title: "Top 50 Technical and HR Interview Questions with Answers",
            price: "399",
            description: "A comprehensive list of commonly asked interview questions and model answers to boost your confidence and preparation.",
        },
    ];
    

    return (
        <>
            <div
                className={`${style.container} text-white py-5 d-flex flex-column align-items-center`}
                style={{ backgroundColor: '#090820', overflowX: 'hidden', minHeight: '100vh' }}
            >
                <p className="fw-bold text-center fs-1 fs-5 mb-4">
                    This <span style={{ color: '#ffd702' }}>2-Hour Free Career Guidance Session</span> is for you if
                </p>
                <div className="row gx-3 justify-content-center align-items-stretch">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="col-12 col-md-6 col-lg-4 m-3 d-flex"
                        >
                            <div
                                className={`${style.pointsBlock} p-3 rounded text-start h-100 w-100`}

                            >
                                <FontAwesomeIcon
                                    icon={faCheckSquare}
                                    size="lg"
                                    className="me-2"
                                    color="#28A745"
                                />
                                <span>{item.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <Button />
                </div>
            </div>

            <div>
                <h1 className="card-text fw-bold text-center my-5">
                    Get FREE <span style={{ color: '#ffc107' }}>BONUSES</span> worth INR ₹5,393 /-
                </h1>

                <div className="container my-5">
                    <div className="row">
                        {offerings.map((item, index) => (
                            <div
                                className="col-md-4 mb-4"
                                key={index}
                            >
                                <div
                                    className="card text-center shadow-lg d-flex flex-column h-100"
                                    style={{
                                        borderRadius: '15px',
                                        overflow: 'hidden',
                                        border: '1px solid black',
                                    }}
                                >
                                    {/* Bonus Header */}
                                    <div className="card-header text-white fw-bold fs-3 py-2" style={{ background: '#090820' }}>
                                        BONUS #{index + 1}
                                    </div>
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-center mb-3">
                                            <h2 className="fw-bold fs-5" style={{color: 'black' }}>
                                                <span>{item.title}</span>
                                            </h2>
                                        </div>
                                        <p className="fw-medium text-start fs-6 text-muted mb-5">
                                            {item.description}
                                        </p>
                                        <div
                                            className="text-white fw-bold py-2 px-3"
                                            style={{
                                                borderRadius: '10px',
                                                fontSize: '1.2rem',
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                maxWidth: '170px',
                                                background: 'linear-gradient(135deg,rgb(255, 8, 0) 0%,rgb(198, 198, 198) 100%)',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                border: '2px solid white',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    left: '-10px',
                                                    height: '20px',
                                                    width: '20px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                }}
                                            ></span>
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '-10px',
                                                    right: '-10px',
                                                    height: '20px',
                                                    width: '20px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                }}
                                            ></span>
                                            Worth ₹{item.price}/-
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="d-flex justify-content-center mb-5">
                    <div className="card text-center">
                        <div className="card-body shadow">
                            <div>
                                <p className="mb-1 fs-6">Total Value: ₹7,486/-</p>
                                <p className="mb-1 fs-5">Regular Price: ₹999/-</p>
                                <p className="text-success fw-bold fs-4">Today's Price: FREE</p>
                            </div>
                            <div className={`${style.Button} d-flex flex-column align-items-center`}>
                                <Button />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bonuses;
