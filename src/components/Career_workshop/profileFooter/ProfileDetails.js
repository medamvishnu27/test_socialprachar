import React from 'react';
import style from './ProfileDetaile.module.css';
import { faBriefcase, faChalkboardTeacher, faUsers, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import profileImage from '../../../assets/careerworkshop/profile.jpg';

const ProfileDetails = () => {
    const stats = [
        { title: '10+', text: 'Years of experience in training and coaching', logo: faChalkboardTeacher },
        { title: '50K+', text: 'Followers and alumni across all social networks', logo: faUsers },
        { title: '300+', text: 'Seminars and workshops conducted', logo: faCalendarAlt },
        { title: '16,000+', text: 'Helped create career success stories', logo: faBriefcase },
        { title: '20,000+', text: 'Built a strong student community', logo: faUsersCog },
        { title: '4', text: 'Founder of successful companies', logo: faBuilding },
    ];

    return (
        <div
            className={`${style.container} text-white d-flex flex-column justify-content-center`}
            style={{ overflowX: 'hidden' }}
        >
            {/* Section Title */}
            <div className="row text-center mt-5 mx-0">
                <div className="col">
                    <h1 className="fw-bold">
                        Meet Your <span style={{ color: '#ffd702' }}>Coach</span>
                    </h1>
                    <hr style={{ width: '10%', border: '3px solid rgb(255, 217, 2)'}} className="mx-auto" />
                </div>
            </div>

            {/* Profile Section */}
            <div className="d-flex flex-wrap justify-content-center align-items-center py-5 mx-0">
                <div className="text-center mx-3">
                    <img
                        src={profileImage}
                        alt="Coach"
                        className="rounded-circle img-fluid"
                        style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            border: '5px solid white',
                        }}
                    />
                </div>
                <div className="text-center mx-3">
                    <h2 className="mb-3">Mahesh Babu Channa</h2>
                    <p>IIM Alumnus & Senior Career Consultant</p>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="container" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <div className="row gx-4 gy-4 mx-0">
                    {stats.map((stat, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className={`${style.card} text-white card d-flex h-100`}>
                                <div className="card-body d-flex flex-column text-start">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h3 className="card-title me-3" style={{ color: '#ffd702' }}>
                                            {stat.title}
                                        </h3>
                                        <FontAwesomeIcon
                                            icon={stat.logo}
                                            className="logo-class"
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                fontSize: '20px',
                                                background: 'black',
                                                padding: '8px',
                                                color: 'white',
                                                borderRadius: '8px',
                                            }}
                                        />
                                    </div>
                                    <p className="card-text fs-5">{stat.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
