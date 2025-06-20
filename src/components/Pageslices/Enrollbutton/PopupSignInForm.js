import React, { useState, useEffect, Suspense } from 'react';
import styles from './PopUpForm.module.css';
import { data } from './../../Cards/CardData';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../extraComponents/loading';

const SignInForm = ({ onClose, courseID, actionType }) => {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        mode: '',
        pageUrl: window.location.href,
        slug: slug || "",
        actionType: actionType || ""
    });


    useEffect(() => {
        const cardDetails = data.find(card => card.slug === slug);
        setCard(cardDetails);
    }, [slug]);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyiFH6YnpFoN2CeaCSOIB5Uv0667e_H3u183xrWTeK95GHV7iUBO1TPn40C6ydXYME2/exec';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phone, actionType, course, mode, pageUrl, slug } = formData;

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }


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
            formPayload.append('actionType', actionType);
            formPayload.append('course', formData.course);
            formPayload.append('mode', formData.mode);
            formPayload.append('pageUrl', pageUrl); // Send Page URL
            formPayload.append('slug', slug); // Send Page Slug


            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formPayload,
            });

            setIsLoading(false);

            if (response.ok) {
                alert('Form submitted successfully!');
                navigate('/thank-you');
            } else {
                alert('Failed to submit form. Please try again.');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
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
                    onClick={onClose}
                    aria-label="Close Form"
                >
                    &times;
                </button>
                <form>
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
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Course</option>
                            {card && card.popUpDropDownCourses && card.popUpDropDownCourses.length > 0 ? (
                                card.popUpDropDownCourses.map((course) => (
                                    <option key={course.dropDownid} value={course.courseName}>
                                        {course.courseName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No available courses</option>
                            )}
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
    );
};

export default SignInForm;
