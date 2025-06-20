import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RegisterForm from './FormButton';
import HeaderStyle from '../Pageslices/Enrollbutton/Enrollbutton.module.css';

const Steps = () => {
    const sliderRef = useRef(null);
    const navRef = useRef(null);


    const scrollToHeading = () => {
        if (navRef.current) {
            navRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    const cards = [
        {
            title: <><span style={{ color: '#ff5003' }}>Step 1:</span> Choose Your Subscription Plan</>,
            text: ["One subscription = Access to multiple job-ready courses",
                " Learn in live trainer - led online or hybrid classes(JNTU KPHB for hybrid)",
                " Gain skills for 20 + job roles"]
        },
        {
            title: <><span style={{ color: '#ff5003' }}>Step 2:</span> Start Learning!</>,
            text: ["Live, interactive classes (Not self-paced)",
                " 1 - year access to learning app & recorded videos",
                " Flexible learning – Switch courses within your plan(Min. 45 days per course)",
                " Learn as many courses as possible within your subscription"]
        },
        {
            title: <><span style={{ color: '#ff5003' }}>Step 3:</span> Build Your Profile &nbsp;and Get Job-Ready</>, text: ["AI Resume Builder & profile optimization",
                " Mock interviews & soft skills training",
                " Job portal access for top career opportunities"],
        },
        {
            title: <><span style={{ color: '#ff5003' }}>Step 4:</span> Get Hired!</>, text: ["Start interviewing from Month 2 based on performance",
                " HR team assistance for job placements across India",
                " Secure a high - paying job with salaries up to ₹12 LPA"]
        },
    ];

    return (
        <div className="container">
            <div ref={navRef} className="text-center d-flex flex-wrap align-items-center justify-content-center gap-2 pb-4">
                <span className="fw-bold fs-2">Still <span style={{ color: '#ff5003' }}>Confused? </span></span>
                <RegisterForm label={"Get in Touch"} className={HeaderStyle.shinebtn} />
            </div>
            <h2 className="text-center fw-bold">Unlock Your IT Career – <span style={{ color: '#ff5003' }}>One Subscription,</span> Endless Possibilities!.</h2>
            <h5 className="text-center">
                Whatever your skill level, you’ll find plenty of step-by-step Creative Cloud tutorials to match your interests.
            </h5>

            {/* React Slick Slider */}
            <div>
                <Slider ref={sliderRef} {...settings}>
                    {cards.map((card, index) => (
                        <div key={index} className="p-3">
                            <div className="card shadow-sm h-100 d-flex flex-column justify-content-center rounded-5 pt-3" style={{ width: "100%", minHeight: "400px" }}>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    {/* Title */}
                                    <h5 className="card-title fw-bold algn-items-start">{card.title}</h5>

                                    {/* Text List */}
                                    <ul className="card-text text-start">
                                        {card.text.map((item, idx) => (
                                            <li key={idx} className=" d-flex text-start"><span className="me-2">✅</span>{item}</li>
                                        ))}
                                    </ul>

                                    {/* Button at the bottom */}
                                    <div className="mt-auto d-flex justify-content-center">
                                        <button className="btn btn-outline-dark px-4 rounded-pill" onClick={scrollToHeading}>Free Trial</button>
                                        {/* <RegisterForm label={"free Trail"} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>



                {/* Custom Navigation Buttons */}
                <div className="d-flex justify-content-center mt-3" style={{ gap: '120px' }}>
                    <button
                        className="btn btn-dark d-flex align-items-center rounded-5"
                        onClick={() => sliderRef.current.slickPrev()}
                    >
                        <FaArrowLeft />

                    </button>
                    <button
                        className="btn btn-dark d-flex align-items-center gap-2 rounded-5"
                        onClick={() => sliderRef.current.slickNext()}
                    >

                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Steps;