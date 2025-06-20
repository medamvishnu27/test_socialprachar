import React, { useState, useCallback } from 'react';
import emptystate from '../../../assets/emptystate.svg';
import style from './Enroll.module.css';
import OneCard from '../../../components/Cards/OneCard';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(JSON.parse(localStorage.getItem('enrolledCourses')) || []);

  const handleCancelEnrollment = useCallback((courseID) => {
    const updatedCourses = enrolledCourses.filter((course) => course.courseID !== courseID);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
    setEnrolledCourses(updatedCourses);
  }, [enrolledCourses]);

  const navigate = useNavigate();
  const handleCardTitleClick = useCallback((courseID) => {
    navigate(`/details/${courseID}`);
  }, [navigate]);


  if (enrolledCourses.length === 0) {
    return (
      <div>
        <img src={emptystate} alt='Empty State Image' className={style.emptyStateImg} />
        <p style={{ textAlign: 'center' }}>No Data Available in this Section</p>
      </div>
    );
  }



  return (
    <div>
      <h2>Enrolled Courses</h2>
      <div className="row">
        {enrolledCourses.map((course) => (
          <OneCard
            key={course.courseID}
            card={course}
            handleCardTitleClick={handleCardTitleClick}
            isEnrolledCoursesPage={true}
            handleCancelEnrollment={() => handleCancelEnrollment(course.courseID)}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;