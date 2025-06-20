import React from "react";
import style from './SecondPart.module.css';
import { FaBookOpen } from 'react-icons/fa';
import RegisterForm from './FormButton';
import HeaderStyle from '../Pageslices/Enrollbutton/Enrollbutton.module.css';
import { useParams } from "react-router-dom";
import Steps from './Steps';

const studentPlan = [
    {
        title: <span style={{ color: '#ff5003' }}>Placement & Internship Benefits</span>,
        subTitle: [
            "Learn Till You Get Placed – Unlimited Interviews",
            "Gain Real-World Experience with Paid Internships",
            "Earn Up to ₹45,000 via Tasks & Referrals",
            "Start Attending Interviews from Month 2",
            "Enjoy Free 6-Month Access to SocialHire",
            "Boost Your Career with AI-Powered Resume Reviews, Mock Interviews & Career Dashboard"
        ],
        color: style.card_acrobat,
    },
    {
        title: <span style={{ color: '#ff5003' }}>Why Choose Us</span>,
        subTitle: [
            "10+ Years of Excellence in EdTech",
            "Trained 16,000+ Aspiring Professionals",
            "Achieving 95% Placement Success",
            "Recognized with 9 Prestigious EdTech Awards",
            "Partnered with 200+ Top Hiring Companies"
        ],
        color: style.card_illustrator,
    },
    {
        title: <>Standard Pack - <span style={{ color: '#ff5003' }}>₹24,999/- month</span></>,
        subTitle: [
            "100% Job Ready programs, Start interviews from 2nd Month onwards",
            "Learn at your own pace with expert-designed courses",
            "Access to in-demand courses:",
            "Digital Marketing",
            "AWS (Amazon Web Services)",
            "DevOps",
            "Data Science",
            "Artificial Intelligence",
            "Java Programming",
            "Python Development",
            "Perfect for working professionals & freshers looking to upskill"
        ],
        color: style.card_adobe,
    },
    {
        title: <>premium Plan - <span style={{ color: '#ff5003' }}>₹44,999/- month</span></>,
        subTitle: [
            "100% Job Ready programs, Start interviews from 2nd Month onwards",
            "All Standard Plan Courses Included",
            "Advanced MERN Full Stack Development",
            "In-Depth AI & ML with Real-World Applications",
            "ChatGPT & Generative AI for Innovation",
            "Comprehensive Cloud Computing",
            "Master SQL & NoSQL Databases",
            "Git & GitHub for Version Control",
            "Complete Web Development (HTML, CSS, JS)",
            "Agile Project Management with Jira & Trello",
            "Exclusive Hands-on Projects & Industry Certifications"
        ],
        color: style.card_photoshop,
    },
    {
        title: <><span style={{ color: '#ff5003' }}>Custom Learning Pack </span>– Tailored Pricing (For Working Professionals Seeking Personalized Learning)</>,
        subTitle: ["Customized learning paths based on your career goals",
            "Select courses & modules as per your requirements",
            "Flexible learning schedule – Online, Live Training, or Hybrid",
            "Mentorship, career guidance & skill - building support",
            "Best for professionals looking for specific upskilling in their domain"],
        color: style.card_premiere,
    },
]
const cardContent = [

    {
        title: <>Ultimate Job-Ready Pack – <span style={{ color: '#ff5003' }}>₹40,000/-</span> (For Serious Professionals & Career Changers)</>,
        subTitle: ["Advanced Live Training (Online or Classroom) + Internship",
            "Master high - demand skills & gain deep expertise",
            "Covers Data Analytics + Data Science + AI, Full Stack Java + React, MERN Stack",
            "Includes resume building, mock interviews & career support",
            "Ideal for professionals aiming for high - paying tech jobs"],
        color: style.card_acrobat,
    },
    {
        title: <><span style={{ color: '#ff5003' }}>Custom Learning Pack </span>– Tailored Pricing (For Students Personalized Learning)</>,
        subTitle: ["Customized learning paths based on your career goals",
            "Select courses & modules as per your requirements",
            "Flexible learning schedule – Online, Live Training, or Hybrid",
            "Mentorship, career guidance & skill - building support",
            "Best for professionals looking for specific upskilling in their domain"],
        color: style.card_premiere,
    },
    {
        title: <>Starter Pack – <span style={{ color: '#ff5003' }}>₹12,000/-</span> (For Beginners & Self-Paced Learners)</>,
        subTitle: ["100% Job Ready programs, Start interviews from 2nd Month onwards",
            "Learn at your own pace with expert - designed courses",
            "Access to Digital Marketing, Data Analytics, AWS, DevOps",
            "Perfect for working professionals & freshers looking to upskill"],
        color: style.card_adobe,
    },
    {
        title: <>Pro Learning Pack –<span style={{ color: '#ff5003' }}> ₹18,000/-</span> (For Those Who Want Interactive Learning)</>,
        subTitle: ["Live Training(Online or Classroom) + Recorded Sessions",
            "Expert mentorship with real - world projects",
            "Covers Data Analytics, Digital Marketing, AWS, DevOps",
            "Ideal for learners who prefer structured, instructor - led sessions"],
        color: style.card_photoshop,
    },
    {
        title: <>Career Growth Pack –<span style={{ color: '#ff5003' }}> ₹28,000/-</span> (For Job Seekers & Career Switchers)</>,
        subTitle: ["Live Training(Online or Classroom) + Internship + Hybrid Learning",
            "Hands - on industry projects & case studies",
            "Gain expertise in Data Analytics + Data Science, AWS + DevOps, Full Stack Java, MERN Stack",
            "Best for those looking to build strong technical foundations & real - world experience"],
        color: style.card_illustrator,
    },

];
const steps = [
    'Choose Plan & Enroll',
    'Start Learning',
    'Work on Projects + Get Certified',
    'Access Internships + AI Tools',
    'Start Interviews',
    'Get Placed + Earn'
];
const SecondPart = () => {
    const { userType } = useParams();
    const displayContent = userType === "students" ? studentPlan : cardContent;
    // const displayText = userType === "students" ? "Students can" : "Working Professionals";

    return (
        <>

            <div className="container py-5">
                <div className="row g-4 d-flex justify-content-center">
                    {/* Header */}
                    <h3 className="text-center">
                        Start Your Learning Journey Today –
                        <span className="fw-bold" style={{ color: '#553cdf' }}> Affordable EMI Plans</span> Available!
                    </h3>
                    <h2 className="fw-bold d-flex justify-content-center">
                        <FaBookOpen className="me-2" fontSize={50} /> Choose Your Perfect Learning Plan
                    </h2>

                    {/* First Row - 3 Cards */}
                    <div className="row g-4 justify-content-center mt-3 px-lg-5">
                        {displayContent.slice(2, 5).map((card, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-12 d-flex">
                                <div className={`card rounded-5 p-4 shadow-lg ${card.color} h-100 d-flex flex-column`}>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h5 className="card-title mb-3 fw-bold">{card.title} - (Call To GET Discount)</h5>
                                        <ul className="list-unstyled flex-grow-1">
                                            {card.subTitle?.map((point, i) => (
                                                <li key={i} className="py-1 d-flex align-items-start">
                                                    <span className="me-2">•</span> {point}
                                                </li>
                                            ))}
                                        </ul>
                                        <RegisterForm label={"Know more"} className="btn btn-light text-black     rounded-5 mt-auto" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Row - 2 Cards (One Large, One Small) */}
                    <div className="row g-4 justify-content-center mt-3 px-lg-5">
                        {/* Large Card */}
                        <div className="col-lg-8 col-md-6 col-sm-12 d-flex">
                            <div className={`card rounded-5 p-4 shadow-lg ${displayContent[0].color} h-100 d-flex flex-column`}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h1 className="card-title mb-3 fw-bold">{displayContent[0].title}</h1>
                                    <ul className="list-unstyled flex-grow-1 fs-5">
                                        {displayContent[0].subTitle.map((point, index) => (
                                            <li key={index} className="py-2 d-flex align-items-start">
                                                <span className="me-2">•</span> {point}
                                            </li>
                                        ))}
                                    </ul>
                                    <RegisterForm label={"Know more"} className="btn btn-light text-black rounded-5 mt-auto" />
                                </div>
                            </div>
                        </div>

                        {/* Small Card - Dynamic Content Based on userType */}
                        <div className="col-lg-4 col-md-6 col-sm-12 d-flex">
                            <div className={`card rounded-5 p-4 shadow-lg ${displayContent[1].color} h-100 d-flex flex-column`}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h3 className="card-title mb-3 fw-bold">{displayContent[1].title}</h3>
                                    <ul className="list-unstyled flex-grow-1">
                                        {displayContent[1].subTitle.map((point, index) => (
                                            <li key={index} className="py-2 d-flex align-items-start">
                                                <span className="me-2">•</span> {point}
                                            </li>
                                        ))}
                                    </ul>
                                    <RegisterForm label={"Know more"} className="btn btn-light text-black rounded-5 mt-auto" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container p-4 bg-white d-flex justify-content-center">
                        <div className="text-center">
                            <h3 className="fw-bold mb-4">How it Works</h3>
                            <div className="position-relative">
                                {/* Vertical Progress Line */}
                                <div className="position-absolute start-0 translate-middle-x top-0 bottom-0"
                                    style={{ width: '4px', background: '#553cdf' }}>
                                </div>

                                <div className="d-flex flex-column gap-4">
                                    {steps.map((step, index) => (
                                        <div key={index} className="d-flex align-items-center position-relative">
                                            {/* Step Content */}
                                            <div className="rounded p-3 flex-grow-1 shadow-sm text-start"
                                                style={{ background: '#7a6ad544', marginLeft: '10px' }}>
                                                <h5 className="mb-0">
                                                    <span className="fs-4 fw-bold">Step {index + 1}: </span>
                                                    {step}
                                                </h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>


                    {/* Footer Section */}
                    <h5 className="fw-bold text-center">
                        Not sure which plan suits you? Talk to our experts & get a personalized roadmap!
                    </h5>
                </div>
            </div>

        </>

    );
};

export default SecondPart;
