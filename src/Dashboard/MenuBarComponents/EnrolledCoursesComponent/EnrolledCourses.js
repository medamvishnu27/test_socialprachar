import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './Enroll.module.css'

const EnrolledCourses = () => {
  const [activeLink, setActiveLink] = useState('EnrolledCourses');
  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];


  const handleClick = (link) => {
    setActiveLink(link);
  };
  
  return (
    <div>
      <h3 className='mb-3 p-3'>Enrolled Courses({enrolledCourses.length})</h3>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ borderBottom: '1px solid #cbc0f3' }}>
        <li className="nav-item dashboard-toggle-nav-item" role="presentation">
          <Link className={`${style.navLink} ${activeLink === 'EnrolledCourses' ? style.active : ''}`}
            onClick={() => { handleClick('EnrolledCourses') }} to='enrolled'>Enrolled Courses({enrolledCourses.length})</Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link className={`${style.navLink} ${activeLink === 'ActiveCourses' ? style.active : ''}`}
            onClick={() => { handleClick('ActiveCourses') }} to='active-courses'>Active Courses</Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link className={`${style.navLink} ${activeLink === 'CompletedCourses' ? style.active : ''}`}
            onClick={() => { handleClick('CompletedCourses') }} to='completed-courses'>Completed Courses</Link>
        </li>

      </ul>
      <div className='mt-3 p-2'>
        <Outlet />
      </div>
    </div>
  )
}
export default EnrolledCourses;