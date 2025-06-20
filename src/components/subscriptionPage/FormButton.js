import React, { useState } from 'react';
import RegisterForm from './SubscriptionForm';


const FormButton = ({label,className}) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };


    return (
        <div>
            <button className={`btn ${className}`}onClick={togglePopup}>
                <span>{label}</span>
            </button>
            {isPopupVisible && <RegisterForm onClose={togglePopup} />}
        </div>
    );
};

export default FormButton;