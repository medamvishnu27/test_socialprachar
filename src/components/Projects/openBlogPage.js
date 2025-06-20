import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaStar, FaPlay, FaEye, FaLink } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Footer from '../footer/footer';
import style from './openBlog.module.css';
import Loading from './../extraComponents/loading';

const OpenBlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                console.log("Fetching blog with ID:", id);
                if (!id) {
                    console.error("ID is undefined");
                    return;
                }

                const docRef = doc(db, "projects", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document Data:", docSnap.data());
                    setBlog(docSnap.data());
                } else {
                    console.error("No document found with ID:", id);
                }
            } catch (error) {
                console.error("Error fetching blog:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [id]);

    if (loading) return <p><Loading /></p>;
    if (!blog) return <p>No data found</p>;

    return (
        <>
            <div className="container-fluid">
                {/* Project Header */}
                <div className="row align-items-center rounded-3 mx-3 my-4 p-3 g-0">
                    {/* Left Side: Title & Image */}
                    <div className="col-lg-4 col-md-4 col-12 text-center text-md-start">
                        <h1 className="fw-bold display-5">{blog.projectName || "Default Title"}</h1>
                        <img
                            src={blog.projectImage}
                            alt="Project"
                            className="rounded img-fluid"
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px' }}
                        />
                    </div>

                    {/* Right Side: Project Info */}
                    <div className="col-lg-4 col-md-4 col-12 d-flex flex-column align-items-start justify-content-center">
                        {/* Project Link (No gap with image) */}
                        <p className={`${style.projectLink} d-flex align-items-center p-2 rounded-5 fw-bold bg-light`}>
                            Project Link: &nbsp;
                            <a href={blog.projectLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                {blog.projectLink}
                            </a>
                            <FaLink className="ms-2 text-primary" />
                        </p>

                        {/* Stats Section */}
                        <div className="d-flex flex-wrap text-secondary small gap-3 mt-2">
                            <span className="d-flex align-items-center">
                                <FaStar className="text-warning me-1" /> {blog.rating || "No Rating"}
                            </span>
                            <span className="d-flex align-items-center">
                                <FaPlay className="me-1" /> {blog.views || "0"}
                            </span>
                            <span className="d-flex align-items-center">
                                <FaEye className="me-1" /> {blog.clicks || "0"}
                            </span>
                        </div>

                        {/* Subtitle */}
                        <p className="text-dark mt-2 fs-5 text-break">{blog.projectSubTitle || "No Description Available"}</p>
                    </div>
                </div>

                {/* Project Description */}
                <h2 className="fw-bold ms-3 mt-4 mb-2">Project Description</h2>
                <div className="border p-4 rounded-3 mx-3">
                    <h3 className="fw-bold">{blog.projectName || "Default Title"}</h3>
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: blog.description }} className="mt-3 text-secondary"></div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>

    );
};

export default OpenBlogPage;
