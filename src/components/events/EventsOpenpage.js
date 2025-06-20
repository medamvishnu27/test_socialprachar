import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Footer from "../footer/footer";
import style from './events.module.css';

const EventsOpenPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const docRef = doc(db, "events", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log("Fetched Data:", data);
                    setTrainer({
                        ...data,
                        benefits: Array.isArray(data.benefits) ? data.benefits : []
                    });
                } else {
                    console.log("No such trainer!");
                }
            } catch (error) {
                console.error("Error fetching trainer:", error);
            }
            setLoading(false);
        };
        fetchTrainer();
    }, [id]);


    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    if (!trainer) return <h2 className="text-center mt-5 text-danger">Trainer Not Found</h2>;

    return (
        <>
            <div>
                <button className={style.brutalistButton} style={{
                    zIndex: "1000", position: "fixed",
                    bottom: "100px",
                    right: "150px",
                }}>
                    <div className={style.msLogo}>
                        <div className={style.msLogoSquare}></div>
                        <div className={style.msLogoSquare}></div>
                        <div className={style.msLogoSquare}></div>
                        <div className={style.msLogoSquare}></div>
                    </div>
                    <div className={style.buttonText}>
                        <span>Register Now</span>
                    </div>
                </button>
            </div>

            <div className="container mt-5">
                <button className="btn btn-outline-dark mb-3 fw-bold d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>

                <div className="card shadow-lg p-4 rounded-4 border-0">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="fw-bold text-dark">{trainer.name}</h2>
                            <h5 className="text-primary fw-semibold">{trainer.skills} Expert</h5>
                            <p className="text-muted fs-5">Experience: {trainer.experience} Years</p>
                            <p className="lead text-dark">{trainer.bio}</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={trainer.trainerImage || "placeholder.jpg"} alt={trainer.trainerName}
                                className="img-fluid rounded-circle shadow-lg"
                                style={{ width: "250px", height: "250px", objectFit: "cover" }} />
                        </div>
                    </div>
                </div>

                <div className="mt-5 p-4 bg-light rounded-3 shadow-sm">
                    <h3 className="fw-bold text-dark mb-3">📚 About this Masterclass</h3>
                    <p>{trainer.about}</p>
                </div>

                {/* <div className="mt-4 p-4 bg-white rounded-3 shadow-sm">
                    <h3 className="fw-bold text-dark mb-3">🎯 What will you gain From this Masterclass</h3>
                    {trainer.benefits && trainer.benefits.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {trainer.benefits.map((point, index) => (
                                <li key={index} className="fs-5 d-flex align-items-center gap-2 py-2 px-3 list-group-item border-0"
                                    style={{ backgroundColor: "rgba(0, 128, 0, 0.1)", borderRadius: "10px", marginBottom: "8px" }}>
                                    <FaCheckCircle className="text-success" /> {point}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No benefits available.</p>
                    )}
                </div> */}

                <Footer />
            </div>
        </>
    );
};

export default EventsOpenPage;
