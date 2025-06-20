import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Dashboard.module.css'


const Dashboard = () => {

  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
  const activeCourses = JSON.parse(localStorage.getItem('activeCourses')) || [];
  const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];

  const navigate = useNavigate();
  const handleSettings = () => {
    navigate('settings')
  }
  return (
    // <!-- Main Content -->
    <>


      {/* <!-- Cards Section --> */}
      <div className='container-fluid'>
        <h2>Dashboard</h2>
        <button className="btn mb-3" style={{ backgroundColor: ' #7c56f6', border: 'none', color: 'white' }} onClick={handleSettings}>Set Your Profile Photo Click Here</button>
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <div className={`card ${style.dashboardCard} text-center py-5`}>
              <div className="card-body">
                <i className={`bi bi-book-fill ${style.dashboardMenuBi}`}></i>
                {/* <!-- Add respective icon className here --> */}
                <h5 className="card-title p-4">Enrolled Courses</h5>
                <h5 className="card-text">{enrolledCourses.length}</h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className={`card ${style.dashboardCard} text-center py-5`}>
              <div className="card-body">
                <i className={`bi bi-mortarboard-fill ${style.dashboardMenuBi}`}></i>
                {/* <!-- Add respective icon className here --> */}
                <h5 className="card-title p-4">Active Courses</h5>
                <h5 className="card-text">{activeCourses.length}</h5>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className={`card ${style.dashboardCard} text-center py-5`}>
              <div className="card-body">
                <i className={`bi bi-trophy-fill ${style.dashboardMenuBi}`}></i>
                {/* <!-- Add respective icon className here --> */}
                <h5 className="card-title p-4">Enrolled Courses</h5>
                <p className="card-text">{completedCourses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     

    </>
  );
};

export default Dashboard;