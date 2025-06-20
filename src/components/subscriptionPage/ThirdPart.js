import React from 'react';
import Steps from './Steps';
import icon from '../../assets/1-1.png';
import RegisterForm from './FormButton';
import RB from '../../assets/subscriptionpage/resume-prep.png';
import interview from '../../assets/subscriptionpage/interview.png';
import DS from '../../assets/subscriptionpage/science.png';
import mentor from '../../assets/subscriptionpage/mentorship.png';
import upskilling from '../../assets/subscriptionpage/upskilling.png';
import FL from '../../assets/subscriptionpage/event.png';
import OC from '../../assets/subscriptionpage/online-course.png';
import LT from '../../assets/subscriptionpage/live-classes.png';
import MP from '../../assets/subscriptionpage/multiple-paths.png';


const ThirdPart = () => {
    return (
        <>

            <div className='text-center' style={{ background: "linear-gradient(to top, rgb(85, 60, 223) 5%, rgb(255, 255, 255) 100%)", }}>
                <div>
                    <Steps />
                </div>
                <div className="container text-start mt-5 mb-3 ">
                    <h3 className='text-center fw-bold'>Your Career Growth Starts Here – <span style={{color:'#553cdf'}}>Learn, Upskill & Grow!</span></h3>
                    <div className="card p-4 mx-auto shadow-lg rounded-4" style={{ maxWidth: "600px", border: '1px solid #553cdf' }}>
                        <p className="text-start fw-bold">Find the perfect learning plan to upskill, grow, and achieve your career goals—whether you're a fresher, working professional, or career switcher. One subscription, endless possibilities!</p>
                        <p>It all starts with <span className='fw-bold'>SocialPrachar’s All-in-One Learning Packs.</span> </p>
                        <div className="d-flex gap-3 justify-content-end my-3">
                            <RegisterForm label={"Buy Now"} className="btn btn-primary px-4 rounded-pill"/>
                            <RegisterForm label={"Free Trail"} className="btn btn-outline-dark px-4 rounded-pill" />
                        </div>
                        <hr />
                        <ul className="list-unstyled text-start">
                            {[
                                {
                                    text: "One Subscription – Multiple Career Paths!.", img:MP
                                },
                                { text: " Learn at Your Own Pace with Flexible Options!.", img:OC },
                                { text: "Get Hands-On Experience with Internships & AI-Powered Career Tools!", img: mentor },
                                { text: " Industry-Recognized Certification to Boost Your Resume!", img: RB},
                                { text: "Live Training, Recorded Sessions & Hybrid Learning Options!", img: LT },
                                { text: "Expert Mentorship & Career Guidance for Job Readiness!", img:mentor },
                                { text: " Access to AI-Powered Resume Building, Mock Interviews & Job Assistance!", img:RB },
                                { text: "Real-World Projects & Case Studies for Practical Learning!", img:upskilling},
                            ].map((item, index, array) => (
                                <React.Fragment key={index}>
                                    <li className="d-flex align-items-center mb-3">
                                        <img src={item.img} alt="Icon" className="me-3 rounded-5" style={{ width: "50px", height: "50px", objectFit: "contain"}} />
                                        <p className="mb-0">{item.text}</p>
                                    </li>
                                    {index !== array.length - 1 && <hr className="my-2" />}
                                </React.Fragment>
                            ))}
                        </ul>

                    </div>
                </div>
                <button className="btn btn-dark px-4 mt-3 rounded-pill mb-5">EMI Starts at Just ₹50/- &nbsp; Per Day</button>
            </div>
        </>
    );
};

export default ThirdPart;
