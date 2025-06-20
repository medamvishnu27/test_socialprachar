import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuickHelp_Button.module.css';
import { FaPhone } from 'react-icons/fa';

const QuickHelpButton = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/suggestions");
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            <div className={`position-fixed ${styles.suggestionButton}`} style={{ top: '120px', left: '20px' }}>
                <div>
                    {/* <p className={styles.quickHelpText}>Quick help!</p> */}
                    <a
                        href="tel:+918019479419"
                        className={`btn shadow ${styles.roundButton} d-flex align-items-center justify-content-center`}
                        style={{ width: "45px", height: "45px", borderRadius: "50%", }}
                    >
                        <FaPhone className="text-success" size={60} />
                    </a>

                </div>
                {/* <button onClick={handleClose} className={`btn fw-bold ${styles.closeButton}`}>
                    x
                </button> */}
            </div>
        </>
    );
};

export default QuickHelpButton;