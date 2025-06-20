import React, { Suspense, useEffect, useState } from 'react';
import styles from '../Pageslices/Enrollbutton/PopUpForm.module.css';
import { useParams } from 'react-router-dom';
import { data } from '../Cards/CardData.js';
import Loading from '../extraComponents/loading.js';

const SuccessStoriesForm = () => {

    const [showSignInForm, setShowSignInForm] = useState(false);

    const handleKnowMoreClick = () => {
        setShowSignInForm(true);
    };
    const handleCloseClick = () => {
        setShowSignInForm(false);
    }


    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        mode: '',
    });

    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const cardDetails = data.find(card => card.slug === slug);
        setCard(cardDetails);
    }, [slug]);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwUXmxm_e_U4J3yR7y7sn8b26WM4dIr51UIjuTmCt43VUOnxSuUR0USb2N_Iqbm2bTV/exec ';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phone, course, mode } = formData;
        if (!fullName || !email || !phone || !course || !mode) {
            alert('Please fill in all required fields.');
            return;
        }
        setIsLoading(true); // Show loading spinner

        try {
            const formPayload = new FormData();
            formPayload.append('fullName', formData.fullName);
            formPayload.append('email', formData.email);
            formPayload.append('phone', formData.phone);
            formPayload.append('course', formData.course);
            formPayload.append('mode', formData.mode);

            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formPayload,
            });

            setIsLoading(false);

            if (response.ok) {
                alert("Thank you for your submission! Your enrollment has been successfully received. Our team will reach out to you shortly for further assistance.");

            } else {
                alert('Failed to submit form. Please try again.');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        }
        setShowSignInForm(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
        <div>
            <div>
                {showSignInForm && (
                    <div className={styles.overlay}>
                        {/* Lazy Loading Spinner at the top */}
                        {isLoading && (
                            <div className={styles.loadingOverlay}>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Loading />
                                </Suspense>
                            </div>
                        )}

                        <div className={styles.formContainer}>
                            <button
                                className={styles.closeButton}
                                onClick={handleCloseClick}
                                aria-label="Close Form"
                            >
                                &times;
                            </button>
                            <form onSubmit={handleSubmit}>
                                <h2>Enroll Now</h2>
                                {/* Full Name */}
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className={styles.formGroup}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Select Course */}
                                <div className={styles.formGroup}>
                                    <select
                                        className="form-select"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select Course</option>
                                        <option value="Data Analytics">Data Analytics</option>
                                        <option value="Data Science & AI">Data Science & AI</option>
                                        <option value="Full stack Mern Java">Full stack Mern Java</option>
                                        <option value="Full stack Mern Python">Full stack Mern Python</option>
                                        <option value="Multi Cloud DevOps">Multi Cloud DevOps</option>
                                    </select>
                                </div>


                                {/* Select Training Mode */}
                                <div className={styles.formGroup}>
                                    <select
                                        name="mode"
                                        value={formData.mode}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Training Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                <button
                    className="btn"
                    onClick={handleKnowMoreClick}
                    style={{
                        fontSize: '16px',
                        color: '#553cdf',
                        fontWeight: '600',
                        border: '1px solid black',
                        padding: '10px 20px',
                    }}
                >
                    Know More
                </button>
            </div>

        </div>
    );
};

export default SuccessStoriesForm;