import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './ScholarShipTest.module.css';
import testImage from '../../assets/careerworkshop/SocialPrachar.png';
import Footer from '../footer/footer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faMedal, faPen, faTrophy, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import ScholarshipFormTest from './ScholarshipFormTest.js';
import { useDateContext } from '../Forms/DateContext.js';
import { Helmet } from 'react-helmet-async';

const faqData = [
    {
        question: "What is Social Prachar?",
        answer: "It is one of the largest online scholarship competitions in India. All Participants in Social Prachar receive a substantial scholarship for Social Prachar's Beginner Full Stack Web Development & Data Analytics Course."
    },
    {
        question: "Who is eligible for the Test?",
        answer: "Anyone and everyone is eligible!! (Students already enrolled in Social Prachar's Main Batch cannot avail the scholarship)."
    },
    {
        question: "What total prize money will be awarded after the Test?",
        answer: "We are contributing more than Rs 1Cr. worth of scholarships for participants of our test. The prizes will be given in the form of scholarships depending on the rank you score on the aptitude test."
    },
    {
        question: "Can I use my phone to take part in this Test?",
        answer: "No. You can't use your Mobile Phones/tablets to give the Test. Use only Laptop/Desktop."
    },
    {
        question: "How exactly do I take part in this challenge?",
        answer: "Steps to take part in the challenge: Register for the challenge, Visit the challenge page on the start date/time, Click on 'Attempt Now' to proceed."
    },
    {
        question: "What will be the syllabus of the aptitude test?",
        answer: "The syllabus typically includes topics like logical reasoning, quantitative aptitude, verbal ability, and analytical reasoning. Check the official website for detailed syllabus information."
    },
    {
        question: "Will the questions be MCQ based?",
        answer: "Yes, all the questions will be MCQ based."
    },
    {
        question: "When will the test results be announced?",
        answer: "The results will be announced within 48 hours on this page."
    },
    {
        question: "Shall I write multiple times?",
        answer: "No, Only ONE time per user is eligible. We will consider your First test marks in order to provide you the discount."
    }
];

const ScholarShipTest = () => {
    const { scholarshipTestDate } = useDateContext();
    const [openIndex, setOpenIndex] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };
    
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // displaying Date
    const formatDate = (dateString) => {
        if (!dateString) return { month: "Month", day: "00", year: "0000" };

        const date = new Date(dateString);
        const options = { month: "long" };

        return {
            month: new Intl.DateTimeFormat("en-US", options).format(date),
            day: date.getDate().toString().padStart(2, "0"),
            year: date.getFullYear(),
        };
    };

    const onlineDate = formatDate(scholarshipTestDate?.onlineDate);
    const offlineDate = formatDate(scholarshipTestDate?.offlineDate);

    return (
        <>
            <Helmet>
                <title>Every week one Top Winner, will get a complete FREE course</title>
            </Helmet>
            <div className={`${style.container} d-flex flex-column align-items-center text-center`} style={{ margin: '0 auto', maxWidth: '1200px', padding: '20px' }}>
                <h1 className="mb-4 text-center fw-bold rounded col-md-12">
                    Every week one <span style={{ color: '#ff5003' }}>Top Winner (Offline Test)</span>, whoever cracks
                    <span className="text-success"> 30/30 </span> in less time will get a
                    <span className="text-uppercase font-weight-bold" style={{ color: '#ff5003' }}> complete FREE Course </span>
                    <span style={{ color: '#553cdf' }}>(No Hidden Charges) </span>& Guaranteed Placement
                </h1>

                <img src={testImage} alt="Scholarship Test" className="img-fluid mb-4" />
                <h1 className="mb-2 fw-bold text-black py-2 text-center">
                    Upcoming Tests:
                </h1>
                <div className={style.eventsContainer}>
                    {/* Online Test Card */}
                    <div className={style.eventCard}>
                        <div className={style.dateBox}>
                            <div className={style.month}>{onlineDate.month}</div>
                            <div className={style.day}>{onlineDate.day}</div>
                            <div className={style.year}>{onlineDate.year}</div>
                        </div>

                        <div className={style.eventDetails}>
                            <div className={`${style.eventTitle} online`}>
                                <div className={`${style.eventIcon} online`}>💻</div>
                                Online Test
                            </div>
                            <div className={style.eventTime}>
                                <h4 style={{ color: "#3a36e0", fontWeight: "bold" }}>
                                    {scholarshipTestDate?.onlineDate || "TBD"}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Offline Test Card */}
                    <div className={`${style.eventCard} offline`}>
                        <div className={style.dateBox}>
                            <div className={style.month}>{offlineDate.month}</div>
                            <div className={style.day}>{offlineDate.day}</div>
                            <div className={style.year}>{offlineDate.year}</div>
                        </div>

                        <div className={style.eventDetails}>
                            <div className={`${style.eventTitle} offline`}>
                                <div className={`${style.eventIcon} offline`}>📝</div>
                                Offline Test
                            </div>
                            <div className={style.eventTime}>
                                <h4 style={{ color: "#ff3002", fontWeight: "bold" }}>
                                    {scholarshipTestDate?.offlineDate || "TBD"}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mb-4 fs-2">Student Discounts Totaling 4,65,000 INR Awarded in the Past Month</p>
                <button className="btn mb-5 fw-bold" onClick={togglePopup} style={{ background: '#553cdf', color: 'white' }}>Register Now</button>
                {isPopupVisible && <ScholarshipFormTest onClose={togglePopup} />}

                <p className="fs-4 mb-5 text-danger fw-bold">We are excited to announce the Scholarship Test 2025, an exclusive opportunity for recent graduates to secure incredible benefits while enrolling in our courses. This is your chance to prove your aptitude and gain access to high-quality education at a fraction of the cost—or even for free!</p>

                <div className="mb-4">
                    <h2 className='mb-4 fw-bold' style={{ color: '#553cdf' }}>Invest in Your Education, Empower Your Future</h2>
                    <h4 className='mb-4 text-center text-secondary'> At Social Prachar, we believe that education is the key to a brighter future. We are proud to announce our exclusive Scholarship Test, designed to recognize and support talented students like you. This is your chance to shine, gain financial assistance, and embark on a rewarding educational journey.</h4>

                    <div className='mb-5'>
                        <p className={style.boxBars}>
                            <FontAwesomeIcon icon={faCheckSquare} />
                            MCQ Based Aptitude Questions
                        </p>
                        <p className={style.boxBars}>
                            <FontAwesomeIcon icon={faPen} />
                            No Negative Marking
                        </p>
                        <p className={style.boxBars}>
                            <FontAwesomeIcon icon={faGraduationCap} />
                            Everyone is Eligible
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className='fw-bold text-secondary'>Benefits</h3>
                    <h2 className='fw-bold pb-2' style={{ color: '#553cdf' }}>Unlock Amazing Benefits</h2>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 d-flex align-items-stretch">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title mb-3">Benefit 1</h3>
                                        <h4 className="card-subtitle mb-4" style={{ color: '#ff3002' }}>Win a Generous Scholarship</h4>
                                        <h6 className="card-subtitle text-muted mb-4">Get up to <span className='text-black'>33% Discount</span> on course fees. It's a live online test, get the test results & assured Discount coupon code to your email within 12 hours after completion of the test.</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-stretch">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title mb-3">Benefit 2</h3>
                                        <h4 className="card-subtitle mb-4" style={{ color: '#ff3002' }}>Recognition and Prestige</h4>
                                        <h6 className="card-subtitle text-muted mb-4">Our scholarship winners receive recognition for their achievements, boosting their confidence and setting them apart from their peers.</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 d-flex align-items-stretch">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title mb-3">Benefit 3</h3>
                                        <h5 className="card-subtitle mb-4" style={{ color: '#ff3002' }}>Access to Exceptional Resources</h5>
                                        <h6 className="card-subtitle text-muted mb-4">Scholarship recipients gain access to our exclusive learning materials, experienced faculty, and a supportive educational community.</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center my-5 gap-5">
                        <h3 className="fw-bold" style={{ color: '#553cdf' }}>
                            Secure Your Future Today! <br /> Limited Seats Available.
                        </h3>
                        <button className="fw-bold btn" onClick={togglePopup} style={{ background: "#553cdf", color: 'white' }}>Claim Your Discount</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className='text-muted fw-bold'>Social Prachar's Scholarship Test 2025</h2>
                    <p className="fs-1 fw-bold" style={{ color: '#ff3002' }}>Everyone is a Winner: 30 Questions - 40 Minutes - 30 Marks</p>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={`${style.downBoxBars} bg-primary`}>
                                <div className={style.discount_icon}><FontAwesomeIcon icon={faTrophy} style={{ color: "#FFD43B", fontSize: '50px' }} /></div>
                                <div className={style.marks}>
                                    <h3 className='fw-bold text-start'>30 Marks</h3>
                                    <h3>(In Offline TEST): Eligible for Fee Discount (Or) 100% Free</h3>
                                    <h3>(In Online TEST): Eligible for  Fee Discount (Or) 50% Free</h3>
                                </div>
                            </div>
                            <div className={`${style.downBoxBars} bg-primary`}>
                                <div className={style.discount_icon}><FontAwesomeIcon icon={faTrophy} style={{ color: "#969696", fontSize: '50px' }} /></div>
                                <div className={style.marks}>
                                    <h3 className='fw-bold text-start'>27-29 Marks</h3>
                                    <h3>Eligible for Fee Discount of 10,000 INR</h3>
                                </div>
                            </div>
                            <div className={`${style.downBoxBars} bg-primary`}>
                                <div className={style.discount_icon}><FontAwesomeIcon icon={faTrophy} style={{ color: "#f56200", fontSize: '50px' }} /></div>
                                <div className={style.marks}>
                                    <h3 className='fw-bold text-start'>21-26 Marks</h3>
                                    <h3>Eligible for Fee Discount of 8,000 INR</h3>
                                </div>
                            </div>
                            <div className={`${style.downBoxBars} bg-primary`}>
                                <div className={style.discount_icon}><FontAwesomeIcon icon={faMedal} style={{ fontSize: '50px' }} /></div>
                                <div className={style.marks}>
                                    <h3 className='fw-bold text-start'>15-20 Marks</h3>
                                    <h3>Eligible for Fee Discount of 5,000 INR</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ section starts */}
            <div className='container py-5'>
                <div className="mb-4">
                    <h1 className="text-center mb-4">Frequently Asked Questions</h1>
                </div>

                <div className={style.faqContainer}>
                    {faqData.map((faq, index) => (
                        <div className={style.faqItem} key={index}>
                            <div 
                                className={`${style.faqQuestion} ${openIndex === index ? style.active : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <h5 className={style.questionText}>{faq.question}</h5>
                                <FontAwesomeIcon 
                                    icon={openIndex === index ? faChevronUp : faChevronDown} 
                                    className={style.chevronIcon}
                                />
                            </div>
                            <div className={`${style.faqAnswer} ${openIndex === index ? style.show : ''}`}>
                                <div className={style.answerContent}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='p-3 text-center'>
                <button className="btn mb-4 fw-bold" onClick={togglePopup} style={{ background: '#553cdf', color: 'white' }}>Register Now</button>
            </div>
            <Footer />
        </>
    );
};

export default ScholarShipTest;