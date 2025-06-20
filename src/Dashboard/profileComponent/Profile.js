import React, { useState, useEffect } from 'react';
import ProfileImage from '../../assets/black_profile.webp';
import { auth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";
import MenuBar from '../SideNavComponent/MenuBar';
import style from './profile.module.css'
import EnrolledCourses from '../MenuBarComponents/EnrolledCoursesComponent/EnrolledCourses';
import Loading from '../../components/extraComponents/loading';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) { // Add this check
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <>


      {userDetails ? (
        <>
          <div className={`${style.Profile} m-2`}>
            <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: "flex-end", height: '40vh' }}>
              {userDetails && userDetails.profileImageUrl ? (
                <img src={userDetails.profileImageUrl} alt="profile image" className={style.profileImg} />
              ) : (
                <img src={ProfileImage} className={style.profileImg} />
              )}
              <div className={style.profileText}>
                <h1>{userDetails ? userDetails.userName : ""}</h1>
                <p>({enrolledCourses.length})Course Enrolled <span style={{ fontSize: '30px', fontWeight: 'bold' }}>.</span> 0 Course Completed</p>
              </div>
            </div>
          </div>

          <div className={style.profileInfo}>
            <h1>{userDetails.userName}</h1>
            <p>0 Course Enrolled <span style={{ fontSize: '30px', fontWeight: 'bold' }}>.</span> 0 Course Completed</p>
          </div>
          <MenuBar />
        </>
      ) : (
        // <p>Loading....</p>
        <Loading/>
      )}
    </>
  );
};

export default Profile;