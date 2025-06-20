import React from 'react';
import { useNavigate } from 'react-router-dom';
import courseCSS from '../Courses_category/Course.module.css';
import BulbText from '../extraComponents/bulbText';
import HomeCard from './HomeCard';
import homeCoursesStyle from './homeCourses.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

const HomeCourses = () => {
    const navigate = useNavigate();

    const handleKnowMoreClick = () => {
        navigate('/courses');
    };

    return (
        <div className={`${courseCSS.categorypage} containerFluidForPadding my-5`}>
            <div className='row '>
                <div className='col col-12 col-sm-12 col-xl-6'>
                    <BulbText
                        BulbText="Courses"
                        bulbTitle="Explore Featured Courses"
                        GreyText="You'll find something to spark your curiosity and enhance"
                    />
                </div>
                <div className="d-flex justify-content-end flex-wrap">
                    <FontAwesomeIcon icon={faRightLong} className={homeCoursesStyle.animated_icon} />
                    <button
                        className={`btn ${homeCoursesStyle.homeCoursesBtn} fw-bold`}
                        onClick={handleKnowMoreClick}
                    >
                        All Courses
                    </button>
                </div>

            </div>

            <div>
                <HomeCard selectedCategory="All" />
            </div>
        </div>
    );
};

export default HomeCourses;
