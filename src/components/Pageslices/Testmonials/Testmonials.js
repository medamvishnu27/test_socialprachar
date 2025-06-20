import React, { useState, useEffect, useRef } from 'react';
import styles from './Testmonials.module.css';
import blackLine from '../../../assets/AssetsOfDetailsPage/blackLine.svg';
import { useParams } from 'react-router-dom';
import { data } from '../../Cards/CardData';

const Testmonials = () => {
    const [studentsEnrolled, setStudentsEnrolled] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [completionRating, setCompletionRating] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [card, setCard] = useState(null);
    const [testimonialImage, setTestimonialImage] = useState('');
    const statsRef = useRef(null);
    const carouselRef = useRef(null); // Ref for carousel container
    const { slug } = useParams();

    const studentPlacedImages = card?.studentPlacedImages || [];

    useEffect(() => {
        const cardDetails = data.find(item => item.slug === slug);
        setCard(cardDetails);
    }, [slug]);

    useEffect(() => {
        // Set the appropriate image based on screen size
        const updateTestimonialImage = () => {
            if (screenWidth < 768) {
                setTestimonialImage(card?.TestmonialsCommentsImage2 || '');
            } else {
                setTestimonialImage(card?.TestmonialsCommentsImage1 || '');
            }
        };

        updateTestimonialImage(); // Initial update

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            updateTestimonialImage(); // Update on resize
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [screenWidth, card]);

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

    // Auto-scrolling carousel logic
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let scrollAmount = 0;
        const step = 1.5; // Adjust scroll speed
        const interval = 10;

        const scrollInterval = setInterval(() => {
            scrollAmount += step;
            if (scrollAmount >= carousel.scrollWidth / 2) {
                scrollAmount = 0;
            }
            carousel.scrollLeft = scrollAmount;
        }, interval);

        return () => clearInterval(scrollInterval);
    }, [studentPlacedImages]);

    return (
        <div className={styles.testimonials}>
            <p className={styles.heading}>TESTIMONIALS</p>
            {/* Section 1: Student Transformation */}
            <div className={styles.section}>
                <h3 className={styles.subHeading}>
                    <span className={styles.highlatedWord}>17,000+ students</span> have already transformed their lives
                </h3>
                <img
                    loading="lazy" 
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    src={blackLine}
                    alt="Decorative Line"
                    className={styles.line}
                />
                {testimonialImage ? (
                    <img
                        loading="lazy" 
                        src={testimonialImage}
                        alt="Student Testimonials"
                        className={styles.image}
                    />
                ) : (
                    <p>No image available for this card.</p>
                )}
            </div>

            {/* Section 2: Statistics with Scrolling Carousel */}
            <div className={styles.section} ref={statsRef}>
                <h3 className={styles.subHeading1}>
                    <span style={{ color: "#ff5003" }}>Numbers </span>that speak for themselves
                </h3>
                <div className={styles.statsContainer}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{studentsEnrolled.toLocaleString()}K</span>
                        <p className={styles.statLabel}>Students Enrolled</p>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>{averageRating}/5</span>
                        <p className={styles.statLabel}>Average Rating</p>
                    </div>
                    {screenWidth > 790 && (
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{completionRating}%</span>
                            <p className={styles.statLabel}>Completion Rating</p>
                        </div>
                    )}
                </div>

                {/* Scrolling Carousel of Student Placements */}
                <div className={styles.carousel} ref={carouselRef}>
                    <div className={styles.carouselImages}>
                        {studentPlacedImages.length > 0 ? (
                            studentPlacedImages.concat(studentPlacedImages).map((student, index) => (
                                <div key={index} className={styles.carouselImage}>
                                    <img loading="lazy" src={student.image} alt={`Student ${index + 1}`} />
                                </div>
                            ))
                        ) : (
                            <p>No placement images available for this course.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testmonials;
