import React from 'react';
import styles from './SocialHire.module.css';
import spLogo from "../../assets/SP_Logo.png";
import socialhireLogo from '../../assets/Social Hire Logo.png';
import headerImage from '../../assets/AssetsOfDetailsPage/Job Ready Courses.png';
import Footer from '../footer/footer';


const SocialHire = () => {

    const handleRedirect = () => {
        window.location.href = 'https://socialhire.in';
    };

    return (
        <>
            <div>
                <div className={`container ${styles.imageContainer}`}>
                    <img className='container' src={headerImage} alt="" />
                </div>

            </div>

            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 text-primary fs-5">
                        <img className={styles.image} src={spLogo} alt="" />
                        <span className='fw-bold fs-1 pe-3 text-center'>+</span>
                        <img className={styles.image} src={socialhireLogo} alt="" />
                        &nbsp; : Your Gateway to Career Success</h1>
                </div>

                <div className="col">
                    <div className="col-lg-8 mb-4">
                        <p className="lead fs-6">
                            🌟 <strong className="text-success">SocialPrachar</strong>: An initiative by IIM alumni, delivering top-notch industry-relevant training for over 10 years.
                        </p>
                        <p className="lead fs-6">
                            🚀 <strong className="text-info">SocialHire</strong>: The AI-powered platform connecting you with career opportunities and tools for success.
                        </p>
                    </div>
                    <div className="col-lg-8 mb-4">
                        <h2 className="h4 text-secondary fs-6">🎁 Exclusive Offer for All Enrolled Students:</h2>
                        <p className="lead fs-6">
                            Enroll in any course at SocialPrachar and get a 6-month free subscription to SocialHire worth ₹3,999 INR!
                        </p>
                        <p>With SocialHire, gain access to:</p>
                        <ul className="list-group">
                            <li className="list-group-item">AI-powered Resume Builder</li>
                            <li className="list-group-item">Curated Job Opportunities</li>
                            <li className="list-group-item">Mock Interviews & Mentorships</li>
                            <li className="list-group-item">Career Roadmaps and more!</li>
                        </ul>
                    </div>
                </div>

                <div className="my-5">
                    <h2 className="h4 text-primary">What We Offer:</h2>
                    <div className="mb-4">
                        <h3 className="h5 text-info">1. Job-Ready Courses:</h3>
                        <p>Comprehensive programs designed to align with industry demands. Focus on in-demand skills like Full Stack, Data Science, AI, Cloud Computing, and Digital Marketing.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="h5 text-info">2. Career Workshops:</h3>
                        <p>Expert-led workshops to guide you in navigating your career path. Gain insights into the latest trends and strategies for career growth.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="h5 text-info">3. Curated Jobs Platform:</h3>
                        <p>Handpicked job opportunities tailored to your skillset. A seamless platform to apply for jobs and get hired.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="h5 text-info">4. AI-Powered Resume Builder:</h3>
                        <p>Create professional and ATS-friendly resumes effortlessly. Stand out to recruiters with optimized and polished resumes.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="h5 text-info">5. Guaranteed Jobs:</h3>
                        <p>Secure job placements with packages ranging from 3 to 12 LPA. A proven track record of 95% placement success.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="h5 text-info">6. AI-Powered Assessment Tools:</h3>
                        <p>Tools to track and improve your performance. Mock interviews and tests to prepare you for the real world.</p>
                    </div>
                </div>

                <div className="my-5">
                    <h2 className="h4 text-primary">Why Choose SocialPrachar?</h2>

                    <div className="mb-4">
                        <p className="lead">
                            📈 <strong className="text-success">Proven Track Record:</strong>
                        </p>
                        <ul className="list-group">
                            <li className="list-group-item">Over 16,000 students trained through online and classroom programs in Hyderabad and Bangalore.</li>
                            <li className="list-group-item">95% placement success rate with strong HR networks across major metro cities.</li>
                            <li className="list-group-item">Job packages ranging from ₹3 to ₹12 LPA.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <p className="lead">
                            🏆 <strong className="text-warning">Recognized Excellence:</strong>
                        </p>
                        <ul className="list-group">
                            <li className="list-group-item">Winner of 9 EdTech Awards for quality training and student success.</li>
                            <li className="list-group-item">Trusted by students and companies for delivering industry-relevant education.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <p className="lead">
                            💡 <strong className="text-info">Real Success Stories:</strong>
                        </p>
                        <ul className="list-group">
                            <li className="list-group-item">Raghu, a Data Science graduate, recently secured a job in AI with a package of ₹6.5 LPA, transforming his career path.</li>
                            <li className="list-group-item">Mansoor, a Full Stack Developer student, now works as a freelancer earning double income while managing a full-time job with 10.4 LPA.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <p className="lead">
                            💰 <strong className="text-danger">Massive Stipend Issuance:</strong>
                        </p>
                        <p>In the last 7 months, ₹2,30,000 INR has been issued as stipends to our interns! This demonstrates our commitment to providing hands-on learning experiences and rewarding performance.</p>
                    </div>

                    <div className="my-5">
                        <h2 className="h4 text-primary">🎯 Internships & Stipends:</h2>
                        <p>Programs include internships with performance-based stipends up to ₹45,000. Gain real-world experience while learning.</p>
                    </div>

                    <div className="text-center mt-5">
                        <p className="lead">
                            With SocialPrachar and SocialHire, you're not just learning; you're building a future. Join us today and take the first step toward achieving your dream job!
                        </p>
                    </div>

                    <div class="d-flex justify-content-center align-items-center pt-5">
                        <button
                            className="btn fw-bold"
                            style={{ background: '#553cdf', color: 'white' }}
                            onClick={handleRedirect}>
                            Know More
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default SocialHire;
