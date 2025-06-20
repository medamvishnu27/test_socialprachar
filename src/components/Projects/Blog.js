import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaBook, FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import style from "./Blog.module.css";
import Loading from './../extraComponents/loading';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const renderTopicsOrTechnologies = (data) => (
        Array.isArray(data) ? data.map((item, index) => (
            <li key={index} className="d-flex align-items-center w-50">• {item}</li>
        )) : null
    );

    return (
        <div>
            <h1 className={`${style.heading} px-4`}>Future Builders: Showcasing Student Projects</h1>

            {loading ? (
                <Loading />
            ) : blogs.length === 0 ? (
                <p className="text-center mt-5">No blogs found.</p>
            ) : (
                <div className="row p-4">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="border shadow-md p-4 rounded-4">
                                <div className="position-relative">
                                    <div className="position-absolute top-0 start-0 bg-white px-3 py-1 rounded-pill text-sm fw-semibold">
                                        {blog.featuredBasedTitle}
                                    </div>

                                    <div className="position-absolute top-0 end-0 text-gray-500">
                                        <FaHeart className="cursor-pointer" />
                                    </div>
                                    <img src={blog.projectImage} className="w-100 rounded-lg" style={{ width: '100%', height: '200px' }} alt="Project" />
                                    <div className="position-absolute bottom-0 start-0 bg-white px-3 py-1 rounded-pill text-sm fw-semibold">
                                        Model
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h5 className="text-lg fw-semibold">{blog.projectName}</h5>
                                    <p className="text-gray-800 text-sm mt-2">{blog.projectSubTitle}</p>

                                    {/* Topics Covered */}
                                    <div>
                                        {/* <h6 className="fw-semibold">
                                            <FaBook className="me-2" /> 📌 Topics Covered
                                        </h6> */}
                                        <h6 className="fw-semibold">
                                            <FaBook className="me-2" />Topics Covered
                                        </h6>

                                        <ul className="list-unstyled text-gray-600 text-sm d-flex flex-wrap">
                                            {renderTopicsOrTechnologies(blog.topicsCovered)}
                                        </ul>
                                    </div>

                                    {/* Tools & Technologies */}
                                    <div className="mt-3">
                                        <h6 className="fw-semibold">🚀 Tools & Technologies</h6>
                                        <ul className="list-unstyled text-gray-600 text-sm d-flex flex-wrap">
                                            {renderTopicsOrTechnologies(blog.toolsTechnologies)}
                                        </ul>
                                    </div>

                                    {/* Open Project Button */}
                                    <NavLink to={`/projects/${blog.id}`} className="btn btn-dark px-4 py-2">
                                        Open
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;
