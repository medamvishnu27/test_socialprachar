import { useEffect, useState } from "react";
import { useDateContext } from "./DateContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";


const cardData = [
    { id: 1, title: "Artificial Intelligence" },
    { id: 2, title: "Advanced Data Science/AI" },
    { id: 3, title: "Data Analytics (Mastery)" },
    { id: 4, title: "Full Stack Java" },
    { id: 5, title: "Full Stack Python" },
    { id: 6, title: "MERN Stack (Full Stack)" },
    { id: 7, title: "Multi Cloud With DevOps" },
    { id: 8, title: "Advanced Digital Marketing" },
];

const DateInput = () => {
    const {
        careerWorkshopDate,
        upcomingBatchesDate
    } = useDateContext();
    const {
        scholarshipTestDate,
        setScholarshipTestDate,
    } = useDateContext();

    // Career Workshop
    const [generalDate, setGeneralDate] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        if (careerWorkshopDate) {
            setGeneralDate(careerWorkshopDate);
            setDate(careerWorkshopDate);
        }
    }, [careerWorkshopDate]);

    const handleGeneralSubmit = async (newDate) => {
        try {
            const docRef = doc(db, "DatesForm", "careerWorkshop");
            await setDoc(docRef, {
                selectedDate: newDate,
                updatedAt: serverTimestamp(),
            });
            setDate(newDate);
            alert("Date updated successfully!");
        } catch (error) {
            console.error("Error updating date:", error);
        }
    };


    // Scholarship Test
    const [onlineTestDate, setOnlineTestDate] = useState("");
    const [offlineTestDate, setOfflineTestDate] = useState("");
    const [submittedOnlineDate, setSubmittedOnlineDate] = useState("");
    const [submittedOfflineDate, setSubmittedOfflineDate] = useState("");

    // Load context dates into local state
    useEffect(() => {
        if (scholarshipTestDate) {
            setOnlineTestDate(scholarshipTestDate.onlineDate || "");
            setOfflineTestDate(scholarshipTestDate.offlineDate || "");
            setSubmittedOnlineDate(scholarshipTestDate.onlineDate || "");
            setSubmittedOfflineDate(scholarshipTestDate.offlineDate || "");
        }
    }, [scholarshipTestDate]);

    const handleOnlineDateSubmit = async () => {
        try {
            const docRef = doc(db, "DatesForm", "scholarshipTest");
            await setDoc(
                docRef,
                {
                    onlineDate: onlineTestDate,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );

            setSubmittedOnlineDate(onlineTestDate);
            setScholarshipTestDate((prev) => ({
                ...prev,
                onlineDate: onlineTestDate,
            }));
            alert("Online Test Date updated!");
        } catch (error) {
            console.error("Error updating online test date:", error);
        }
    };

    const handleOfflineDateSubmit = async () => {
        try {
            const docRef = doc(db, "DatesForm", "scholarshipTest");
            await setDoc(
                docRef,
                {
                    offlineDate: offlineTestDate,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );

            setSubmittedOfflineDate(offlineTestDate);
            setScholarshipTestDate((prev) => ({
                ...prev,
                offlineDate: offlineTestDate,
            }));
            alert("Offline Test Date updated!");
        } catch (error) {
            console.error("Error updating offline test date:", error);
        }
    };


    // upcoming Batches
    const [id, setId] = useState("");
    const [idSpecificDate, setIdSpecificDate] = useState("");
    const [datesById, setDatesById] = useState({});
    useEffect(() => {
        const fetchBatchDates = async () => {
            try {
                const snap = await getDoc(doc(db, "DatesForm", "upcomingBatches"));
                if (snap.exists()) {
                    const data = snap.data();
                    setDatesById(data);
                }
            } catch (error) {
                console.error("Error fetching batch dates:", error);
            }
        };
        fetchBatchDates();
    }, []);


    const handleIdSubmit = async () => {
        if (!id || !idSpecificDate) {
            alert("Please enter both ID and Date.");
            return;
        }

        try {
            const docRef = doc(db, "DatesForm", "upcomingBatches");
            const key = String(id);

            await updateDoc(docRef, {
                [key]: idSpecificDate,
            });

            // Update local state
            setDatesById((prev) => ({
                ...prev,
                [key]: idSpecificDate,
            }));

            alert(`Date for ID ${key} saved!`);
            setId(""); // Clear input
            setIdSpecificDate("");
        } catch (error) {
            console.error("Error updating date for ID:", error);
            alert("Failed to update date.");
        }
    };



    // Events
    const [cards, setCards] = useState([]);
    const [eventData, setEventData] = useState({
        eventName: '',
        startDate: '',
        startTime: '',
        slots: '',
        trainerName: '',
        skills: '',
        about: '',
        benefits: ''
    });

    const navigate = useNavigate();
    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch events from Firebase
    const fetchEvents = async () => {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCards(eventsList);
    };
    // Handle input changes
    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
        const { name, value } = e.target;
        const updatedValue = name === "benefits" ? value.split("\n") : value;
        setEventData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));

    };
    // Submit form data to Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'events'), eventData);
            //           ...eventData,
            // benefits: eventData.benefits.filter(Boolean), // Remove empty lines
            //     });
            alert('Event added successfully!');
            setEventData({ eventName: '', startDate: '', startTime: '', slots: '', trainerName: '', skills: '', about: '', benefits: '' });
            fetchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    // handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData(prev => ({ ...prev, trainerImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    {/* General Date Selection */}
                    <div className="col-md-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title text-center">📅 Career Workshop</h3>
                                <label className="form-label fw-bold">Select Date:</label>
                                <input
                                    type="date"
                                    value={generalDate}
                                    onChange={(e) => setGeneralDate(e.target.value)}
                                    className="form-control"
                                />
                                <button
                                    onClick={() => handleGeneralSubmit(generalDate)}
                                    className="btn btn-primary mt-3"
                                >
                                    Submit
                                </button>
                                <p className="mt-3 text-muted">
                                    📅 Stored Career Workshop Date: <strong>{date}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scholarship Exam Dates Form */}
                    <div className="my-5 p-4 border rounded shadow">
                        <h3 className="card-title text-center">📅 Scholarship Test Dates</h3>
                        <form>
                            <div className="mb-3">
                                <label className="fw-bold">Online Test Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={onlineTestDate}
                                    onChange={(e) => setOnlineTestDate(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={handleOnlineDateSubmit}
                            >
                                Submit Online Test Date
                            </button>
                            {submittedOnlineDate && (
                                <p className="mt-2 text-success">✅ Online Test Date: {submittedOnlineDate}</p>
                            )}

                            <div className="mb-3 mt-3">
                                <label className="fw-bold">Offline Test Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={offlineTestDate}
                                    onChange={(e) => setOfflineTestDate(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={handleOfflineDateSubmit}
                            >
                                Submit Offline Test Date
                            </button>
                            {submittedOfflineDate && (
                                <p className="mt-2 text-info">✅ Offline Test Date: {submittedOfflineDate}</p>
                            )}
                        </form>
                    </div>

                    {/* Course Date Selection */}
                    <div className="col-md-12 mt-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title text-center">📅 Upcoming Batches</h3>
                                <h4 className="fw-semibold">Available Courses:</h4>
                                <ul className="list-group mb-3">
                                    {cardData.map((course) => (
                                        <li key={course.id} className="list-group-item">
                                            <strong>ID {course.id}:</strong> {course.title}
                                        </li>
                                    ))}
                                </ul>

                                {/* Date Selection for Specific ID */}
                                <label className="form-label fw-bold">Set Date for Specific ID:</label>
                                <input
                                    type="text"
                                    placeholder="Enter ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="form-control mb-2"
                                />
                                <input
                                    type="date"
                                    value={idSpecificDate}
                                    onChange={(e) => setIdSpecificDate(e.target.value)}
                                    className="form-control"
                                />
                                <button
                                    onClick={handleIdSubmit}
                                    className="btn btn-success mt-3"
                                >
                                    Save Date for ID
                                </button>

                                {/* Display Stored Dates  */}
                                {Object.keys(datesById).length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="fw-semibold">Stored Dates:</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Course</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(datesById).map(([key, value]) => {
                                                    const course = cardData.find((c) => c.id === Number(key));
                                                    return (
                                                        <tr key={key}>
                                                            <td>{key}</td>
                                                            <td>{course?.title || "Unknown"}</td>
                                                            <td className="text-primary">{value}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg container pt-5">
                        <h1 className='fw-bold'>Social Prachar <span style={{ color: '#ff5003' }}>MasterClasses</span></h1>
                        <h4 className='text-muted'>Learn Tech Concepts From Industry Leaders!</h4>
                        <div className="mt-5 p-4 border rounded shadow">
                            <h3>Add New Event</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Event Name</label>
                                        <input type="text" className="form-control" name="eventName" value={eventData.eventName} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Start Date</label>
                                        <input type="date" className="form-control" name="startDate" value={eventData.startDate} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Start Time</label>
                                        <input type="time" className="form-control" name="startTime" value={eventData.startTime} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Number of Slots</label>
                                        <input type="number" className="form-control" name="slots" value={eventData.slots} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Trainer Name</label>
                                        <input type="text" className="form-control" name="trainerName" value={eventData.trainerName} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Trainer Image</label>
                                        <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Skills Covered</label>
                                        <input type="text" className="form-control" name="skills" value={eventData.skills} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">About the Masterclass</label>
                                        <textarea className="form-control" rows="3" name="about" value={eventData.about} onChange={handleChange} required></textarea>
                                    </div>
                                    {/* <div className="col-md-12 mb-3">
                                        <label className="form-label">What Will You Get?</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="benefits"
                                            value={eventData.benefits.join("\n")}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div> */}

                                </div>
                                <button type="submit" className="btn btn-success">Add Event</button>
                            </form>
                        </div>

                        {/* Display Events */}
                        <div className="row mt-5">
                            {cards.map((card, index) => (
                                <div key={index} className="col-md-4 mb-4 shadow" onClick={() => navigate(`/events/${card.eventName}`)} style={{ cursor: 'pointer' }}>
                                    <div className="card" style={{ width: '100%' }}>
                                        <div className="card-body">
                                            {card.trainerImage && (
                                                <img src={card.trainerImage} alt="Trainer" className="rounded-circle mb-3" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                            )}
                                            <h5 className="card-title">{card.eventName}</h5>
                                            <p className="card-text mb-1">Start Date: <span>{card.startDate}</span></p>
                                            <p className="card-text mb-1">Start Time: <span>{card.startTime}</span></p>
                                            <p className="card-text mb-1">Trainer: <span>{card.trainerName}</span></p>
                                            <p className="card-text mb-1">Skills: <span>{card.skills}</span></p>
                                            <h6 className="text-danger">Only {card.slots} slots remaining!</h6>
                                            <hr />
                                            <button className="fw-bold btn btn-primary">Open</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DateInput;
