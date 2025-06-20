// EnrollButton.js
import React, { useState } from 'react';
import Buttonstyle from './Enrollbutton.module.css';
import SignInForm from './PopupSignInForm.js';

const EnrollButton = ({ label, courseID }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className={Buttonstyle.Enrollbutton}>
      <button className={Buttonstyle.shinebtn} onClick={togglePopup}>
        <span> {label}</span>
      </button>

      {isPopupVisible && <SignInForm onClose={togglePopup} courseID={courseID} actionType="Enroll Now"/>}
    </div>
  );
};
export default EnrollButton;
