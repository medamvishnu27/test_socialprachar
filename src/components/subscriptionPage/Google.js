import React, { useRef } from 'react';
import GoogleStyle from '../successStories/googleStyles.module.css';
import { googleData } from '../successStories/googleData';
import googleLogo from '../../../src/assets/successStories/google.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';


const Google = () => {
      const scrollRef = useRef(null);
        const handleMouseMove = (e) => {
            const container = scrollRef.current;
            if (container) {
                container.scrollLeft += e.movementX;
            }
        };

    return (
        <div>
            <div className={GoogleStyle.google}>
                <p className={`${GoogleStyle.header} text-center`}>Google
                    <span>
                        <img
                            src={googleLogo}
                            alt="Google Logo"
                            className={GoogleStyle.HeadingGoogleLogo}
                        />
                    </span>
                </p>
                <div
                    className={`${GoogleStyle.wholeGoogleCard} container`}
                    ref={scrollRef}
                    style={{
                        display: "flex",
                        overflowX: "auto",
                    }}
                    onMouseMove={handleMouseMove}
                >
                    <div className="row flex-row flex-nowrap pt-3 align-items-stretch">
                        {googleData.map((data) => (
                            <div
                                key={data.id}
                                className="col-3 col-sm-4 col-lg-4 col-xl-4 d-flex"
                            >
                                <div className={`${GoogleStyle.googleCard} card h-100 d-flex flex-column`}>
                                    <div className={GoogleStyle.insideGoogleCard}>
                                        <FontAwesomeIcon
                                            icon={faQuoteLeft}
                                            style={{ color: "#553cdf", fontSize: "1.7rem" }}
                                            className={GoogleStyle.iconStart}
                                        />
                                        <div className={GoogleStyle.card}>
                                            <p>{data.content}</p>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faQuoteRight}
                                            style={{ color: "#553cdf", fontSize: "1.7rem" }}
                                            className={GoogleStyle.iconEnd}
                                        />
                                    </div>
                                    {/* Centered Comment Section */}
                                    <div
                                        className={`${GoogleStyle.googleCommentPerson} d-flex flex-column align-items-center justify-content-center mt-4`}
                                    >
                                        <img
                                            src={data.commentPerson.profileImage || "path-to-default-image"}
                                            alt="Profile"
                                            className={`${GoogleStyle.profileImage} rounded-circle mb-2`}
                                        />
                                        <p className={`mb-1 fw-bold ${GoogleStyle.name}`}>{data.commentPerson.name}</p>
                                        <p className={`text-muted mb-12`}>{data.commentPerson.stars}</p>
                                        <img
                                            src={googleLogo}
                                            alt="Google Logo"
                                            className={GoogleStyle.googleLogo}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Google;