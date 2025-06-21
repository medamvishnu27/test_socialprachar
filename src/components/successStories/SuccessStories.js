import React, { useEffect, useRef, useState, Suspense } from 'react';
import style from './SuccessStories.module.css';
import GoogleStyle from './googleStyles.module.css';
import trustPilotStyle from './trustPilot.module.css';
import Footer from './../footer/footer.js';
import linkedinLogo from '../../../src/assets/successStories/linkedin.png';
import justDialLogo from '../../../src/assets/AssetsOfDetailsPage/masterclass/JustDial_Logo.png';
import googleLogo from '../../../src/assets/successStories/google.png';
import { linkedinData } from './linkedinData.js';
import { googleData } from './googleData.js';
import { trustPilotData } from './trustpilot.js';
import { ourAluminiReviews } from './ourAluminiReviews.js';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import redline from '../../assets/RedLine.webp';
import SuccessStoriesForm from './SuccessStoriesForm.js';
import award_image from '../../assets/successStories/award_image.jpg';
import higherPackage from '../../assets/subscriptionpage/higherpackage.png';
import hiring1 from '../../assets/successStories/hiringImage1.jpg';
import hiring2 from '../../assets/successStories/hiringImage2.jpg';
import hiring3 from '../../assets/successStories/hiringImage3.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { collection, db } from '../../firebase.js';
import { getDocs } from 'firebase/firestore';
import Achievementcard from './Achievementcard.js';
import { Helmet } from 'react-helmet';

const hiringImages = [
    { src: hiring1, alt: 'Hiring 1' },
    { src: hiring3, alt: 'Hiring 3' },
    { src: hiring2, alt: 'Hiring 2' },
];

const SuccessStories = () => {
    const [studentsEnrolled, setStudentsEnrolled] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [completionRating, setCompletionRating] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef(null);
    const isMobile = window.innerWidth < 768;
    const [achievements, setAchievements] = useState([]);
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedSection, setSelectedSection] = useState('all');

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        animateCount(setStudentsEnrolled, 17, 1000);
                        animateCount(setAverageRating, 4.9, 1000);
                        animateCount(setCompletionRating, 86, 1000);
                        setHasAnimated(true);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) observer.observe(statsRef.current);
        return () => {
            if (statsRef.current) observer.unobserve(statsRef.current);
        };
    }, [hasAnimated]);

    const animateCount = (setter, target, duration) => {
        let start = 0;
        const increment = target / (duration / 50);

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                setter(target);
                clearInterval(interval);
            } else {
                setter(Math.round(start * 10) / 10);
            }
        }, 50);
    };


    const scrollRef = useRef(null);
    const handleMouseMove = (e) => {
        const container = scrollRef.current;
        if (container) {
            container.scrollLeft += e.movementX;
        }
    };
    const [activeJobIndex, setActiveJobIndex] = useState(0);
    const [activeAwardIndex, setActiveAwardIndex] = useState(0);

    const recentJobs = [
        { id: 1, name: "Sarah Johnson", image: higherPackage },
    ];

    const recentAwards = [
        { id: 1, name: "David Rodriguez", image: award_image },
    ];

    // fetching Achievements
    const filteredAchievements = achievements.filter(achievement => {
        const roleMatch = selectedRole === 'all' || achievement.role === selectedRole;
        const sectionMatch = selectedSection === 'all' || achievement.applicableSection === selectedSection;
        return roleMatch && sectionMatch;
    });

    useEffect(() => {
        const fetchAchievements = async () => {
            const snapshot = await getDocs(collection(db, "successStories-studentAchievements"));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAchievements(data);
        };
        fetchAchievements();
    }, []);


    const groupAchievementsByCategory = (achievements) => {
        return achievements.reduce((acc, achievement) => {
            const category = achievement.category || 'Other'; // Default to 'Other' if no category
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(achievement);
            return acc;
        }, {});
    }

    const groupedAchievements = groupAchievementsByCategory(filteredAchievements);



  return (
    <>
      <Helmet>
        <title>16000+ Success Stories Since 2014 | SocialPrachar</title>
        <meta name="description" content="Read inspiring success stories of over 16,000 students trained by SocialPrachar since 2014. Learn how our courses helped transform careers with 95% placement success." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://socialprachar.com/success-stories" />
        <meta property="og:title" content="16000+ Success Stories Since 2014 | SocialPrachar" />
        <meta property="og:description" content="Read inspiring success stories of over 16,000 students trained by SocialPrachar since 2014. Learn how our courses helped transform careers with 95% placement success." />
        <meta property="og:image" content="https://socialprachar.com/path-to-success-stories-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://socialprachar.com/success-stories" />
        <meta name="twitter:title" content="16000+ Success Stories Since 2014 | SocialPrachar" />
        <meta name="twitter:description" content="Read inspiring success stories of over 16,000 students trained by SocialPrachar since 2014. Learn how our courses helped transform careers with 95% placement success." />
        <meta name="twitter:image" content="https://socialprachar.com/path-to-success-stories-twitter-image.jpg" />
      </Helmet>
      <div className="container-fluid bg-light">
        <div className="text-center pt-4">
          <h1 className="display-5 fw-bold">Our Success Stories</h1>
          <p className="lead">Celebrating excellence and achievement in our community</p>
        </div>

                <div className="row g-4 justify-content-center">
                    {/* Job Placements */}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <h5
                            className="text-center mb-3 fw-bold text-uppercase position-relative d-inline-block px-3"
                            style={{
                                color: "#553cdf",
                                letterSpacing: "1px",
                                paddingBottom: "5px",
                                marginTop: "10px",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.35)",
                            }}
                        >
                            Recent Best Salary Package of the March 2025
                        </h5>
                        <div
                            className="card shadow bg-dark text-white w-100 position-relative rounded-4 overflow-hidden d-flex flex-column"
                            style={{ height: "360px" }}
                        >
                            <img
                                src={recentJobs[activeJobIndex].image}
                                className="img-fluid w-100 h-100"
                                alt={recentJobs[activeJobIndex].name}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>

                    {/* Awards Section */}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <h5
                            className="text-center mb-3 fw-bold text-uppercase position-relative d-inline-block px-3"
                            style={{
                                color: "#553cdf",
                                letterSpacing: "1px",
                                paddingBottom: "5px",
                                marginTop: "10px",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.35)",
                            }}
                        >
                            Training & Development Company of the Year 2025
                        </h5>
                        <div
                            className="card shadow bg-dark text-white w-100 position-relative rounded-4 overflow-hidden d-flex flex-column"
                            style={{ height: isMobile ? "auto" : "360px" }}
                        >
                            <img
                                src={recentAwards[activeAwardIndex].image}
                                className="img-fluid w-100 h-100"
                                alt={recentAwards[activeAwardIndex].name}
                                style={{ objectFit: isMobile ? "cover" : "contain" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center p-6">
                <h1 className="display-5 fw-bold mb-4">Recent Hiring Drive April 2025
                    {/* Pulsing Gradient Line Below Heading */}
                    <div data-aos="fade-left" className="relative w-full flex justify-center h-2">
                        <div className="w-72 sm:w-96 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse-line"></div>
                    </div>

                </h1>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4"
                >
                    {hiringImages.map((image, index) => (
                        <img
                            data-aos="fade-up"
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-[200px] object-cover rounded-lg shadow-md"
                        />
                    ))}
                </div>
            </div>



            <div className={style.topContent}>
                <div className={style.insights}>
                    <p className={`${style.insightsHeader} text-center mb-4`}>16000+ Success Stories Since 2014</p>
                    <div className="container">
                        <div className={`${style.wholeInsights} row justify-content-center g-3`}>
                            <div className="col-md-4 col-sm-4 col-12 d-flex flex-column">
                                <div className={`${style.insideBox} p-4 text-center rounded shadow-sm w-100`}>
                                    <p>
                                        <strong>127 %</strong> <br />
                                        Average Placement Hike
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-12 d-flex align-items-stretch">
                                <div className={`${style.insideBox} p-4  text-center rounded shadow-sm w-100`}>
                                    <p>
                                        <strong>8 Lakh</strong> <br />
                                        Average CTC
                                    </p>
                                </div>
                            </div>
                            <div className=' col-md-4 col-sm-4 col-12 d-flex align-items-stretch'>
                                <div className={`${style.insideBox} p-4 text-center rounded shadow-sm w-100`}>
                                    <p>
                                        <strong>21 LPA</strong> <br />
                                        Highest CTC
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${style.statsContainer} container mt-4`}>
                    <div className={`${style.statsContainer} row justify-content-center`} ref={statsRef}>
                        <div className="col-12 col-md-4 text-center mb-3">
                            <div className={`${style.stat}`}>
                                <span className={`${style.statValue} fs-2 fw-bold text-black`}>
                                    {studentsEnrolled.toLocaleString()}000+
                                </span>
                                <p className={`${style.statLabel} mt-2`}>Students Alumini</p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 text-center mb-3">
                            <div className={`${style.stat}`}>
                                <span className={`${style.statValue} fs-2 fw-bold text-black`}>
                                    {averageRating}/5
                                </span>
                                <p className={`${style.statLabel} mt-2`}>Average Rating</p>
                            </div>
                        </div>

                        {screenWidth > 790 && (
                            <div className="col-12 col-md-4 text-center mb-3">
                                <div className={`${style.stat}`}>
                                    <span className={`${style.statValue} fs-2 fw-bold text-black`}>
                                        {completionRating}%
                                    </span>
                                    <p className={`${style.statLabel} mt-2`}>Completion Rating</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="container d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                    <div className="text-center">
                        <p className={`${style.leadHeading} lead text-muted mb-4 text-center`}>
                            From Aspiration to Achievement <br />
                            <span style={{ color: '#553cdf', position: 'relative', display: 'inline-block' }}>
                                Our Success Stories
                                <div data-aos="fade-right">
                                    <img
                                        src={redline}
                                        // height= {50}
                                        // width={100}
                                        alt=""
                                        style={{
                                            display: 'block',
                                            margin: '0 auto',
                                            position: 'absolute',
                                            top: -35,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                            </span>
                        </p>

                        <p className={`${style.Headercontent} text-dark`}>
                            Explore the inspiring success stories of our students at Social Prachar, where exceptional results and achievements take center stage.
                            Witness their transformative journeys, groundbreaking accomplishments, and firsthand experiences that showcase the power of learning
                            and growth with us.
                        </p>
                    </div>
                </div>


                <div>
                    {/* Filter Buttons */}
                    <div className={`${style.filterButtons} d-flex justify-content-center my-3`}>
                        <div className={style.btn_group}>
                            <button type="button" className={style.btn}
                                onClick={() => setSelectedSection('Full Stack Development - Java')}>
                                Full Stack Java
                            </button>
                            <button type="button" className={style.btn}
                                onClick={() => setSelectedSection('Full Stack Development - Python')}>
                                Full Stack Python
                            </button>
                            <button type="button" className={style.btn}
                                onClick={() => setSelectedSection('Data Science & AI')}>
                                Data Science & AI
                            </button>
                            <button type="button" className={style.btn}
                                onClick={() => setSelectedSection('Digital Marketing')}>
                                Digital Marketing
                            </button>
                            <button type="button" className={style.btn}
                                onClick={() => setSelectedSection('all')}>
                                Show All
                            </button>
                        </div>
                    </div>

                    {/* OurAchievements */}
                
                    <div className="container py-4">
                        <div className={`d-flex flex-column ${style.hide_scrollbar}`} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                            {Object.keys(groupedAchievements).map((category) => {
                                const achievements = groupedAchievements[category];
                                const mid = Math.ceil(achievements.length / 2);
                                const firstRow = achievements.slice(0, mid);
                                const secondRow = achievements.slice(mid);

                                return (
                                    <div key={category} className="mb-5">
                                        <div
                                            className={`d-flex flex-nowrap mb-3 ${style.hide_scrollbar}`}
                                            style={{
                                                overflowX: 'auto',
                                                overflowY: 'hidden',   // Hide vertical scrollbar
                                                gap: '20px',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            {firstRow.map((achievement, index) => (
                                                <div key={index} style={{ minWidth: '320px' }}>
                                                    <Achievementcard achievement={achievement} />
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className={`d-flex flex-nowrap ${style.hide_scrollbar}`}
                                            style={{
                                                overflowX: 'auto',
                                                overflowY: 'hidden',  
                                                gap: '20px',
                                                paddingBottom: '10px',
                                            }}
                                        >
                                            {secondRow.map((achievement, index) => (
                                                <div key={index} style={{ minWidth: '320px' }}>
                                                    <Achievementcard achievement={achievement} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div >

                <hr className="mx-auto w-75" />
                <div className="text-center" style={{ fontSize: '18px' }}>
                    <p className='fw-bold'>
                        SocialPrachar alumni are working in 1,100+ companies across India. Contact us to know more about placements!
                    </p>
                    <SuccessStoriesForm />
                </div>
            </div >

    {/*Linkedin cards  */ }
    <div div className = { style.linkedin } >
                <div className="text-center pt-5">
                    <h1 className={`${style.linkedinHeader} mb-4`}>Linked
                        <span>
                            <img
                                src={linkedinLogo}
                                alt="Google Logo"
                                className={GoogleStyle.HeadingLinkedinLogo}
                            />
                        </span>
                    </h1>
                </div>
                <div
                    className={`${style.wholeLinkedinCard} container`}
                    ref={scrollRef}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        // cursor: "grab",
                    }}
                    onMouseMove={handleMouseMove}
                >
                    <div className="row flex-row flex-nowrap pt-3">
                        {linkedinData.map((profile) => (
                            <div className="col-4 col-md-4 col-lg-4" key={profile.id}>
                                <div className={`${style.customCard} card`}>
                                    <div className={style.linkedinInnerCardtitle}>
                                        Linked<span><img src={linkedinLogo} alt="" className={style.linkedinLogo} /></span>
                                    </div>
                                    <div className={`${style.linkedinInnerBox} card-body shadow`}>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={profile.image}
                                                alt=""
                                                className={`${style.profileImage} rounded-circle me-3`}
                                            />
                                            <div className={style.profileName}>
                                                <h5 className="mb-1">{profile.name}</h5>
                                                <p className="mb-0 text-muted">{profile.role}</p>
                                            </div>
                                        </div>
                                        <div className={`${style.linkedinContent} mt-3`}>
                                            <p>
                                                {profile.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >

    {/* google comments */ }
    <div div className = { GoogleStyle.google } >
                <p className={`${GoogleStyle.header} text-center`}>Google
                    <span>
                        <img
                            src={googleLogo}
                            alt="Google Logo"
                            className={GoogleStyle.HeadingGoogleLogo}
                        />
                    </span>
                </p>
                <div
                    className={`${GoogleStyle.wholeGoogleCard} container`}
                    ref={scrollRef}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                    }}
                    onMouseMove={handleMouseMove}
                >
                    <div className="row flex-row flex-nowrap pt-3 align-items-stretch">
                        {googleData.map((data) => (
                            <div
                                key={data.id}
                                className="col-3 col-sm-4 col-lg-4 col-xl-4 d-flex"
                            >
                                <div className={`${GoogleStyle.googleCard} card h-100 d-flex flex-column`}>
                                    <div className={GoogleStyle.insideGoogleCard}>
                                        <FontAwesomeIcon
                                            icon={faQuoteLeft}
                                            style={{ color: "#553cdf", fontSize: "1.7rem" }}
                                            className={GoogleStyle.iconStart}
                                        />
                                        <div className={GoogleStyle.card}>
                                            <p>{data.content}</p>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faQuoteRight}
                                            style={{ color: "#553cdf", fontSize: "1.7rem" }}
                                            className={GoogleStyle.iconEnd}
                                        />
                                    </div>
                                    {/* Centered Comment Section */}
                                    <div
                                        className={`${GoogleStyle.googleCommentPerson} d-flex flex-column align-items-center justify-content-center mt-4`}
                                    >
                                        <img
                                            src={data.commentPerson.profileImage || "path-to-default-image"}
                                            alt="Profile"
                                            className={`${GoogleStyle.profileImage} rounded-circle mb-2`}
                                        />
                                        <p className={`mb-1 fw-bold ${GoogleStyle.name}`}>{data.commentPerson.name}</p>
                                        <p className={`text-muted mb-12`}>{data.commentPerson.stars}</p>
                                        <img
                                            src={googleLogo}
                                            alt="Google Logo"
                                            className={GoogleStyle.googleLogo}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >


    {/* success Pilot */ }
    <div div className = { trustPilotStyle.trustPilotContainer } >
                <div className="text-center pt-5">
                    <h1 className={`${trustPilotStyle.trustPilotHeader} mb-4`}>
                        <span>
                            <img
                                src={justDialLogo}
                                alt="JustDial Logo"
                                className={GoogleStyle.HeadingJustDialLogo}
                            />
                        </span>
                    </h1>
                </div>
                <div
                    className={`${trustPilotStyle.trustPilotScrollContainer} container`}
                    ref={scrollRef}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "1rem",
                        paddingBottom: "1rem",
                    }}
                    onMouseMove={handleMouseMove}
                >
                    {trustPilotData.map((testimonial, index) => (
                        <div
                            className="col-12 col-sm-10 col-md-8 col-lg-4"
                            key={index}
                        >

                            <div className="card shadow-sm" style={{ maxWidth: "420px", height: '63vh', padding: '30px 0px', border: '2px solid #553cdf', borderRadius: '15px' }}>
                                <div className="card-body">
                                    <div className={trustPilotStyle.cardBody}>
                                        <div className={trustPilotStyle.cornerStar}>
                                            {"★ Just Dial"}
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div
                                                className={`${trustPilotStyle.profile} rounded-circle text-white d-flex justify-content-center align-items-center`}

                                            >
                                                {testimonial.initial}
                                            </div>
                                            <div className="ms-3">
                                                <h5 className="mb-0">{testimonial.name}</h5>
                                            </div>
                                        </div>
                                        <hr />
                                        <FontAwesomeIcon
                                            icon={faQuoteLeft}
                                            style={{ color: "#553cdf", fontSize: "1.7rem" }}
                                            className={trustPilotStyle.iconStart}
                                        />
                                        <p className={`${trustPilotStyle.title}`}>{testimonial.title}</p>
                                        <div className="text-success mb-3">
                                            {"★".repeat(testimonial.rating)}
                                        </div>
                                        <p className={`${trustPilotStyle.description} text-muted`}>{testimonial.description}</p>
                                        <FontAwesomeIcon
                                            icon={faQuoteRight}
                                            style={{ color: "#553cdf", fontSize: "1.7rem" }}
                                            className={trustPilotStyle.iconEnd}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
    </div >


    {/*our Alumini Review */ }
    <div div className = { style.ourAlumini_Reviews } >
                <h2 className="text-center">Our Alumni Reviews</h2>
                <div className="container my-5">
                    <div
                        className={`${style.alumniScrollContainer} d-flex`}
                        ref={scrollRef}
                        style={{
                            overflowX: "auto",
                            gap: "1rem",
                            paddingBottom: "1rem",
                        }}
                        onMouseMove={handleMouseMove}
                    >
                        {ourAluminiReviews.map((student) => (
                            <div
                                key={student.id}
                                className={"col-12 col-md-6 col-lg-4 mb-4"}
                                style={{ minWidth: "300px" }}
                                onClick={() => window.open(student.linkedin)}
                            >
                                <div
                                    className={`${style.wholeAlumniCard} card shadow`}
                                    style={{ borderRadius: "15px", height: "300px" }}
                                >
                                    <div className="card-body">
                                        {/* Success Story Heading */}
                                        <div className="d-flex justify-content-between">
                                            <p className="fw-bold">Success Story</p>
                                            <p className="fw-bold">Social Prachar</p>
                                        </div>

                                        {/* Placement Journey Section */}
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-around align-items-center">
                                                <div>
                                                    <div>
                                                        <p className="h6">
                                                            <span style={{ color: "#553cdf" }}>
                                                                Placement
                                                            </span>{" "}
                                                            Journey
                                                        </p>
                                                        <hr className="my-2" />
                                                        <p className={`mb-0`}>
                                                            From{" "}
                                                            <span className="fw-bold">
                                                                {student.homeTown}
                                                            </span>
                                                        </p>
                                                        <p className="h6 fw-bold">
                                                            to{" "}
                                                            <span style={{ color: "#553cdf" }}>
                                                                {student.role}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className={`table ${style.table}`} style={{ width: "160px" }}>
                                                        <table
                                                            className={`${style.offersTable} table table-bordered text-center`}
                                                            style={{ fontSize: "8px" }}
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th colSpan="3" style={{}}>
                                                                        <p
                                                                            className="m-0"
                                                                            style={{
                                                                                fontWeight: "800",
                                                                                fontSize: "9px",

                                                                            }}
                                                                        >
                                                                            Offers From:
                                                                        </p>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {student.offers.map((offer, index) => (
                                                                        <td key={index}>
                                                                            <img
                                                                                src={offer.logo}
                                                                                style={{
                                                                                    width: "35px",
                                                                                    height: "25px",
                                                                                    objectFit: "contain",
                                                                                }}
                                                                                alt={`${offer.company}`}
                                                                            />
                                                                            <span style={{ fontSize: "8px" }}>
                                                                                {offer.company}
                                                                            </span>
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                                {/* Profile Image Behind the Personal Info Section */}
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    <img
                                                        src={student.image}
                                                        alt={`${student.name}'s profile`}
                                                        className={`${style.alumniProfileImage} rounded-circle`}

                                                    />

                                                    {/* Person Information Section Above Image */}
                                                    <div className={`${style.personalInfo} border`}>
                                                        <span className={style.aluminiStudentName}>
                                                            {student.name}
                                                        </span>
                                                        <span
                                                            style={{
                                                                marginBottom: "2px",
                                                                fontWeight: "800",
                                                            }}
                                                        >
                                                            {student.role}
                                                        </span>
                                                        <span

                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                height: "26px",
                                                                width: "100%",
                                                                justifyContent: "center",

                                                            }}
                                                        >
                                                            <img
                                                                src={student.presentCompany}
                                                                alt="Company Logo"
                                                                style={{
                                                                    width: "18px",
                                                                    height: "18px",
                                                                    marginRight: "3px",

                                                                }}
                                                            />
                                                            {student.companyname}
                                                            {/* {student.offers[0]} */}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    </div >

    <div>
        <Footer />
    </div>
        </>
    );
};

export default SuccessStories; 