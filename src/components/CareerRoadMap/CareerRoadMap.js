import React, { useState } from 'react';
import { RoadMapData } from './RoadMapData';
import style from './CareerRoadMap.module.css';
import Footer from '../footer/footer';

const CareerRoadMap = ({ onClose }) => {
    const [formData, setFormData] = useState({
        course: '',
        name: '',
        email: '',
        phone: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleDownloadClick = (fileName) => {
        if (fileName !== "Download RoadMap") {
            setSelectedFile(fileName);
            setIsFormOpen(true); // Open the form
        } else {
            alert("Download not available for this course.");
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.course) errors.course = 'Please select a course.';
        if (!data.name) errors.name = 'Please enter your name.';
        if (!data.email) {
            errors.email = 'Please enter your email address.';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!data.phone) {
            errors.phone = 'Please enter your phone number.';
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Please enter a valid 10-digit phone number.';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.values(errors).some(error => error)) return;

        setLoading(true);

        try {
            const formDataEncoded = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataEncoded.append(key, value);
            });
            formDataEncoded.append('sheetName', 'careerRoadmaps');

            const response = await fetch("https://script.google.com/macros/s/AKfycbzr6UbL2zGx8LF0C3qW-Gq2ohpONS9q7aXqyWkr_qg5oPHTqOgPnCIjs8_0uQ17PRlMQg/exec", {
                method: "POST",
                body: formDataEncoded,
            });

            if (!response.ok) throw new Error("Failed to submit the form.");

            alert('Thank you for Submission! Your form has been submitted successfully.');
            setIsFormOpen(false); // Close the form

            // Trigger file download after successful form submission
            if (selectedFile) {
                const link = document.createElement("a");
                link.href = `/roadmaps/${selectedFile}`;
                link.download = selectedFile;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            alert('There was an error submitting your form. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            {isFormOpen && (
                <div>
                    <div
                        className="blur-background"
                        style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.21)',
                            zIndex: '999',
                        }}
                    ></div>

                    <div
                        className="modal d-flex align-items-center justify-content-center"
                        style={{ position: 'fixed', top: '0', width: '100%', height: '100%', zIndex: '1000' }}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <div
                                className="modal-content bg-dark text-white p-4 position-relative"
                                style={{ border: '2px solid white' }}
                            >
                                <button
                                    className="btn-close btn-close-white position-absolute"
                                    onClick={() => setIsFormOpen(false)}
                                    style={{ top: '10px', right: '15px', border: '2px solid white' }}
                                ></button>
                                <h2 className="text-warning text-center mb-4">REGISTER NOW</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
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
                                        {formErrors.course && <div className="text-danger">{formErrors.course}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                        />
                                        {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            required
                                        />
                                        {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter Phone Number"
                                            required
                                        />
                                        {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn w-100 fw-bold text-uppercase"
                                        disabled={loading}
                                        style={{ background: '#553cdf', color: 'white' }}
                                    >
                                        {loading ? (
                                            <div className="spinner-border text-light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="my-4">
                <h1 className="fw-bold text-center mb-4 text-secondary">Career RoadMap</h1>
                <div className="row text-center">
                    {RoadMapData.map((course, index) => (
                        <div className="col-md-6 mb-4 d-flex" key={index}>
                            <div className={`${style.courseCard} p-3`}>
                                <h4 className='text-secondary fw-bold'>Course Name: <strong>{course.courseName}</strong></h4>
                                <p>No. of Hours to Learn: {course.noOfHoursToLearn}</p>
                                <p>Projects Included: {course.projectsIncluded}</p>
                                <p>Students Trained Till Now: {course.studentsTrainedTillNow}</p>
                                <button
                                    className={`fw-bold btn mt-3 ${style.downloadRoadMap}`}
                                    onClick={() => handleDownloadClick(course.downloadRoadMap)}
                                >
                                    Download RoadMap
                                </button>
                            </div>
                            {index % 2 === 0 && index < RoadMapData.length - 1 && (
                                <div className={`${style.verticalLine} mx-2`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CareerRoadMap;
