import React from 'react';
import tickMark from '../../../assets/careerworkshop/tickmarkGreen.png';
import style from './WhatWillYouGet.module.css';


const WhatWillYouGet = () => {
    return (
        <>

            <div className={`${style.WhatWillYouGet} d-flex justify-content-center align-items-center text-light py-5`}>
                <div className="text-center">
                    <p className="h2 fw-bold mb-4">
                        What you will get from <span className="text-warning"><br />2-Hour Time Investment</span>
                        {/* <hr style={{ width: '10%', border: '3px solid white' }} className="mx-auto" /> */}
                    </p>
                    <div className="row justify-content-center gx-3 gy-3 px-3 mx-0">
                        <div className="col-12 col-md-6 col-lg-5 d-flex">
                            <div className={`${style.pointer} p-3 border rounded text-white flex-grow-1`}>
                                <p className="m-0 d-flex align-items-center text-warning">
                                    <img src={tickMark} alt="tick mark" className="me-2" width="24" height="24" />
                                    4 Steps to Kickstart a Profitable and Rewarding Career
                                </p>
                                <small className="text-white">Master the essentials for building a career that offers both financial growth and professional satisfaction.</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 d-flex">
                            <div className={`${style.pointer} p-3 border rounded text-white flex-grow-1`}>
                                <p className="m-0 d-flex align-items-center text-warning">
                                    <img src={tickMark} alt="tick mark" className="me-2" width="24" height="24" />
                                    How to Create a Supportive Network to Accelerate Your Career
                                </p>
                                <small className="text-white">Learn to build meaningful connections that help you avoid career pitfalls and achieve success faster.</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 d-flex">
                            <div className={`${style.pointer} p-3 border rounded text-white flex-grow-1`}>
                                <p className="m-0 d-flex align-items-center text-warning">
                                    <img src={tickMark} alt="tick mark" className="me-2" width="24" height="24" />
                                    Explore In-Demand Skills and Accelerate Your Career Growth
                                </p>
                                <small className="text-white">Discover high-growth paths like Full Stack Development, Data Science, AI, and Cloud Computing. Learn actionable steps to enhance your profile and secure top opportunities.</small>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 d-flex">
                            <div className={`${style.pointer} p-3 border rounded text-white flex-grow-1`}>
                                <p className="m-0 d-flex align-items-center text-warning">
                                    <img src={tickMark} alt="tick mark" className="me-2" width="27" height="27" />
                                    3 Core Principles to Achieve Long-Term Career Success
                                </p>
                                <small className="text-white">Focus on critical areas that ensure consistent progress and make your career future-proof.</small>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className={style.comments}>
                <div className={`${style.commentsContainer} container py-5 vh-75`}>
                    <h1 className="text-center fw-bold fs-2 fs-6 mb-0">
                        Join the <span className="" style={{ color: '#ffc107' }}>12,000+ GRADUATES </span>
                        Who Have Successfully Launched Their Tech Careers - Your Journey Starts Here!
                    </h1>
                    <div className="row justify-content-center gx-4 gy-4 mt-2">
                        {[
                            {
                                text: "This workshop was a game-changer for me! I learned how to identify my strengths and prepare for interviews effectively. Today, Iâ€™m a proud software engineer, thanks to the strategies I picked up here.", author: "Priyanka Reddy K", role: 'Software Engineer at FrameWorks(Chennai)'
                            },
                            {
                                text: "I had no direction before attending the Career Success Workshop. The session on resume building and the mock interviews helped me land a dream job at Razorpay. Highly recommend this to all students!", author: "Rahul Sharma P", role: 'Data Scientist at Razorpay(Banglore)'
                            },
                            {
                                text: "The practical advice on industry trends and how to network made all the difference. I got my first internship because of the tips shared in the workshop, and it eventually led to my career as a Product Manager.", author: "Sneha GopalaKrishna", role: 'Product Manager at Zolvo'
                            },
                            {
                                text: "I attended this workshop as a college fresher. The guidance on building technical skills and crafting an ATS-friendly resume gave me an edge over others. Thanks to this, I secured my first job within three months!", author: "Arjun Mutthukumar", role: 'Full Stack Developer at Dunzo'
                            },

                            { text: "The workshop gave me clarity about what roles I should pursue in the tech industry.The insights on cloud computing trends motivated me to specialize in the field, and today, Iâ€™m living my dream!.", author: "Nisha Varalakshmi V", role: 'Cloud Engineer at PostMan(Hyderabad)' },

                            {
                                text: "The entrepreneurship tips and real-life success stories shared at the workshop inspired me to start my own venture. I gained the confidence to take risks and build a profitable business.", author: "Vikram Srinivas", role: 'Enterpreneur at HealthTech Start Up'
                            },

                        ].map((comment, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                                <div className="p-3 border rounded bg-light h-100 w-100 d-flex flex-column">
                                    <p className="text-black m-0 flex-grow-1">{`"${comment.text}"`}</p>
                                    <p className="fw-bold text-end m-0 mt-2">- {comment.author}</p>
                                    <p className='text-secondary fs-6 text-end m-0 mt-2'>- {comment.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
};

export default WhatWillYouGet;
