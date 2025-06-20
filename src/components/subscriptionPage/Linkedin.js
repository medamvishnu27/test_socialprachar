import React, { useEffect, useRef, useState } from 'react';
import style from '../successStories/SuccessStories.module.css';
import GoogleStyle from '../successStories/googleStyles.module.css';
import linkedinLogo from '../../../src/assets/successStories/linkedin.png';
import { linkedinData } from '../successStories/linkedinData';

const Linkedin = () => {
    const statsRef = useRef(null);
    const scrollRef = useRef(null);
    const [studentsEnrolled, setStudentsEnrolled] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
        const [completionRating, setCompletionRating] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleMouseMove = (e) => {
        const container = scrollRef.current;
        if (container) {
            container.scrollLeft += e.movementX;
        }
    };

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

    return (
        <div>

            <div className={`${style.insights}`}>
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

            <div className={`${style.statsContainer} container pb-5 mb-5`}>
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


            <div className={style.linkedin}>
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
            </div>
        </div>
    );
};

export default Linkedin;