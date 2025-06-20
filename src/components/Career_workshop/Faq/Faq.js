import React, { useState } from 'react';
import style from './Faq.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faQuestion, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import Footer from '../../footer/footer';

const faqData = [
    {
        question: "What is the main objective of this workshop?",
        answer: "The workshop aims to help freshers and job seekers identify the right career path, build job-ready skills, and create a clear plan for securing their dream job."
    },
    {
        question: "Who is this workshop designed for?",
        answer: "It is ideal for fresh graduates, students nearing graduation, and anyone struggling to find direction in their job search or early career."
    },
    {
        question: "What will I learn during the workshop?",
        answer: "You will learn how to:\n- Identify in-demand tech career options.\n- Build a strong resume and LinkedIn profile.\n- Network effectively for job opportunities.\n- Upskill with relevant certifications and projects."
    },
    {
        question: "Is this workshop only for those pursuing tech careers?",
        answer: "While the focus is on tech careers like Full Stack Development, Data Science, AI, and Cloud Computing, the strategies and tips are applicable to a wide range of industries."
    },
    {
        question: "Will there be actionable takeaways from the session?",
        answer: "Yes, you will receive a step-by-step guide to plan your career, a checklist for job applications, and resources for further skill development."
    },
    {
        question: "How will this workshop help me if I'm already applying for jobs?",
        answer: "The workshop will refine your job search strategy, improve your application materials, and teach you how to align your skills with industry demands for better results."
    },
    {
        question: "Do I need prior knowledge or experience to attend?",
        answer: "No prior experience is needed. The workshop is designed for beginners and freshers who are just starting their career journey."
    },
    {
        question: "Will there be opportunities to ask questions during the session?",
        answer: "Yes, there will be a Q&A segment at the end of the workshop where you can ask career-specific questions."
    },
    {
        question: "Is there any fee to attend the workshop?",
        answer: "No, the workshop is completely free of charge."
    },
    {
        question: "How can I register for the workshop?",
        answer: "You can register through the provided link or contact the organizer directly for assistance with registration."
    }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div className="container py-5">
                <h1 className="text-center mb-4">Frequently Asked Questions</h1>
                <div className={style.faqContainer}>
                    {faqData.map((faq, index) => (
                        <div className={style.faqItem} key={index}>
                            <button
                                className={`${style.faqQuestion} ${openIndex === index ? style.active : ''}`}
                                onClick={() => toggleAccordion(index)}
                                type="button"
                            >
                                <span className={style.questionText}>{faq.question}</span>
                                <FontAwesomeIcon 
                                    icon={openIndex === index ? faChevronUp : faChevronDown} 
                                    className={style.chevronIcon}
                                />
                            </button>
                            <div 
                                className={`${style.faqAnswer} ${openIndex === index ? style.show : ''}`}
                            >
                                <div className={style.answerContent}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.contact}>
                <p
                    className="text-center mb-4 fw-bold"
                    style={{ fontSize: "32px", position: 'relative', top: '18px' }}
                >
                    Let's <span style={{ color: "#ff5003" }}>Connect</span>
                </p>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        {/* Call Box */}
                        <div className="col-md-4 mb-3 d-flex justify-content-center">
                            <div
                                className="box p-4 text-center border border-primary rounded shadow-sm w-100"
                                style={{ maxWidth: "300px" }}
                            >
                                <FontAwesomeIcon icon={faPhone} className="mb-3" style={{ fontSize: "50px", color: "#000" }} />
                                <h4 className="mb-1 text-primary fw-semibold">Call Us</h4>
                                <p className="fw-bold mb-3" style={{ fontSize: "20px" }}>+91-8019-479-419</p>
                                <a href="tel:+918019479419" className="btn btn-primary w-100">
                                    <b>Call Now</b>
                                </a>
                            </div>
                        </div>

                        {/* lets Connect */}
                        <div className="col-md-4 mb-3 d-flex justify-content-center">
                            <div
                                className="box p-4 text-center border border-danger rounded shadow-sm w-100"
                                style={{ maxWidth: "300px" }}
                            >
                                <FontAwesomeIcon icon={faLightbulb} className="mb-3" style={{ fontSize: "50px", color: "#FFC107" }} />
                                <h5 className="mb-1 text-primary fw-semibold">Confused about choosing the right career?</h5>
                                <p className="fw-bold mb-3" style={{ fontSize: "14px" }}>
                                    Take our 10-minute quiz to find your perfect fit!
                                </p>
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={() => navigate('/career-quiz')}
                                >
                                    <b>Career Checker</b>
                                </button>
                            </div>
                        </div>

                        {/* WhatsApp Chat Box */}
                        <div className="col-md-4 mb-3 d-flex justify-content-center">
                            <div
                                className="box p-4 text-center border border-success rounded shadow-sm w-100"
                                style={{ maxWidth: "300px" }}
                            >
                                <FontAwesomeIcon icon={faWhatsapp} className="mb-3" style={{ fontSize: "50px", color: "#25D366" }} />
                                <h4 className="mb-1 text-primary fw-semibold">WhatsApp Us at</h4>
                                <p className="fw-bold mb-3" style={{ fontSize: "20px" }}>+91-8019-479-419</p>
                                <a
                                    href="https://wa.me/918019479419?text=Hello%2C%20I%20would%20like%20to%20connect%20with%20you!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success w-100"
                                >
                                    Chat with us on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Faq;