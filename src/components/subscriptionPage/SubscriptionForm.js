import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Pageslices/Enrollbutton/PopUpForm.module.css';
import Loading from '../extraComponents/loading';

const SubscriptionForm = ({ onClose }) => {
    const { userType } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        education: "",
        yearOfPassing: "",
        selectedCourses: [],
        trainingMode: "",
        userType: userType || "General",
    });

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbwegwRjGZJzUglDDlHIDHnuLry6gOEUSi_Y7AsCrvMsqaEnoONZSD0m3c4gvMz2fyMubg/exec";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some((value) => !value)) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);

        const formDataEncoded = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataEncoded.append(key, value);
        });
        formDataEncoded.append("pageUrl", window.location.href);
        formDataEncoded.append("sheetName", "subscription");
        // Map selectedCourses back to subscriptionPlans for backend compatibility
        formDataEncoded.append(
            "subscriptionPlans",
            formData.selectedCourses.join(", ")
        );

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                body: formDataEncoded,
            });

            const result = await response.text();

            if (!response.ok) throw new Error("Failed to submit form");

            alert(`Form submitted successfully for ${formData.userType}!`);
            setFormData({
                name: "",
                email: "",
                phone: "",
                education: "",
                yearOfPassing: "",
                selectedCourses: [],
                trainingMode: "",
                userType: userType || "General",
            });
            onClose();
        } catch (error) {
            alert("An error occurred while submitting the form.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const updatedCourses = checked
                ? [...prevState.selectedCourses, value]
                : prevState.selectedCourses.filter((course) => course !== value);

            return {
                ...prevState,
                selectedCourses: updatedCourses,
            };
        });
    };

    // Course details with descriptions and durations
    const courseDetails = [
        {
            name: "Data Analytics",
            description: "Learn data visualization and BI tools",
            duration: "3 months",
        },
        {
            name: "Data Science & AI",
            description: "Master ML and AI algorithms",
            duration: "6 months",
        },
        {
            name: "Full Stack MERN Java",
            description: "Build apps with Java backend",
            duration: "4 months",
        },
        {
            name: "Full Stack MERN Python",
            description: "Develop with Python backend",
            duration: "4 months",
        },
        {
            name: "Multi Cloud DevOps",
            description: "Learn cloud infrastructure & CI/CD",
            duration: "5 months",
        },
    ];

    return (
        <>
            <div
                className={styles.overlay}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                }}
            >
                {isLoading && (
                    <div
                        className={styles.loadingOverlay}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            zIndex: 1100,
                        }}
                    >
                        <Loading />
                    </div>
                )}
                <div
                    className={styles.formContainer}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
                        padding: "20px",
                        maxWidth: "360px",
                        width: "90%",
                        position: "relative",
                        maxHeight: "70vh",
                        overflowY: "auto",
                        margin: "0 auto",
                    }}
                >
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        style={{
                            position: "sticky",
                            top: "5px",
                            right: "5px",
                            float: "right",
                            background: "none",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#888",
                            zIndex: 10,
                        }}
                    >
                        &times;
                    </button>
                    <form onSubmit={handleSubmit}>
                        <h2
                            style={{
                                color: "#2C3E50",
                                marginBottom: "15px",
                                textAlign: "center",
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            Register Now{" "}
                            <span style={{ color: "#3498DB", textWrap: 'nowrap' }}>({formData.userType})</span>
                        </h2>

                        <div style={{ marginBottom: "15px" }}>
                            {["name", "email", "phone", "yearOfPassing"].map((field) => (
                                <div
                                    className={styles.formGroup}
                                    key={field}
                                    style={{ marginBottom: "10px" }}
                                >
                                    <input
                                        type={
                                            field === "email"
                                                ? "email"
                                                : field === "phone"
                                                    ? "tel"
                                                    : "text"
                                        }
                                        name={field}
                                        className={styles.input}
                                        placeholder={
                                            field === "yearOfPassing"
                                                ? "Year of Passing"
                                                : field.charAt(0).toUpperCase() + field.slice(1)
                                        }
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            borderRadius: "6px",
                                            border: "1px solid #ddd",
                                            fontSize: "15px",
                                            transition: "border-color 0.3s",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                            ))}

                            {[
                                ["education", ["B.Tech", "Degree", "MBA", "MCA", "Other"]],
                                ["trainingMode", ["Online", "Offline"]],
                            ].map(([name, options]) => (
                                <div
                                    className={styles.formGroup}
                                    key={name}
                                    style={{ marginBottom: "10px" }}
                                >
                                    <select
                                        name={name}
                                        className={styles.select}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px 12px",
                                            borderRadius: "6px",
                                            border: "1px solid #ddd",
                                            fontSize: "15px",
                                            appearance: "none",
                                            backgroundImage:
                                                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "right 12px center",
                                            backgroundSize: "12px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <option value="">
                                            {name.charAt(0).toUpperCase() + name.slice(1)}
                                        </option>
                                        {options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        <div className={styles.formGroup} style={{ marginBottom: "15px" }}>
                            <label
                                style={{
                                    fontWeight: "600",
                                    color: "#2C3E50",
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "16px",
                                    textAlign: 'start'
                                }}
                            >
                                Select Courses
                            </label>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                {courseDetails.map((course) => (
                                    <div
                                        key={course.name}
                                        style={{
                                            border: formData.selectedCourses.includes(course.name)
                                                ? "2px solid #3498DB"
                                                : "1px solid #ddd",
                                            borderRadius: "8px",
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "all 0.3s ease",
                                            backgroundColor: formData.selectedCourses.includes(
                                                course.name
                                            )
                                                ? "#F8F9FA"
                                                : "white",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            const simulatedEvent = {
                                                target: {
                                                    value: course.name,
                                                    checked: !formData.selectedCourses.includes(
                                                        course.name
                                                    ),
                                                },
                                            };
                                            handleCheckboxChange(simulatedEvent);
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginRight: "10px",
                                                position: "relative",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "4px",
                                                    border: formData.selectedCourses.includes(course.name)
                                                        ? "2px solid #3498DB"
                                                        : "2px solid #BDC3C7",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: formData.selectedCourses.includes(
                                                        course.name
                                                    )
                                                        ? "#3498DB"
                                                        : "white",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                {formData.selectedCourses.includes(course.name) && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="white"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="selectedCourses"
                                                value={course.name}
                                                checked={formData.selectedCourses.includes(course.name)}
                                                onChange={handleCheckboxChange}
                                                style={{
                                                    position: "absolute",
                                                    opacity: 0,
                                                    cursor: "pointer",
                                                    height: 0,
                                                    width: 0,
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: "#2C3E50",
                                                        fontSize: "15px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {course.name}
                                                </span>
                                                {/* <span
                          style={{
                            color: "#E74C3C",
                            fontWeight: "600",
                            fontSize: "12px",
                            backgroundColor: "#FADBD8",
                            padding: "2px 6px",
                            borderRadius: "10px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {course.duration}
                        </span> */}
                                            </div>
                                            <p
                                                style={{
                                                    margin: "2px 0 0 0",
                                                    color: "#7F8C8D",
                                                    fontSize: "13px",
                                                    textAlign: 'start'
                                                }}
                                            >
                                                {course.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading}
                            style={{
                                width: "100%",
                                padding: "12px",
                                backgroundColor: "#3498DB",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#2980B9")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#3498DB")}
                        >
                            {isLoading ? (
                                <span style={{ display: "flex", alignItems: "center" }}>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            animation: "spin 1s linear infinite",
                                            marginRight: "8px",
                                        }}
                                    >
                                        <style>{`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}</style>
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="rgba(255,255,255,0.3)"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12"
                                            stroke="white"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            fill="none"
                                        />
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                "Register Now"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .${styles.formContainer} {
          animation: fadeIn 0.4s ease-out;
        }
        .${styles.formContainer}::-webkit-scrollbar {
          width: 6px;
        }
        .${styles.formContainer}::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .${styles.formContainer}::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .${styles.formContainer}::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
        </>
    );
};

export default SubscriptionForm;
