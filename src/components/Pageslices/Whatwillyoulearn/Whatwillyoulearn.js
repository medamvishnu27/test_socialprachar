import React, { useEffect, useState } from 'react';
import styles from './Whatwillyoulearn.module.css';
import { data } from '../../Cards/CardData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import backgroundImage from '../../../assets/AssetsOfDetailsPage/background.png';
import { useParams } from 'react-router-dom';
import Buttonstyle from '../Enrollbutton/Enrollbutton.module.css';
import SignInForm from '../Enrollbutton/PopupSignInForm';

const colors = ["#f0f8ff", "#f5f5dc", "#ffe4e1", "#e6e6fa", "#ffefd5", "#d3ffce", "#e6e6fa", "#ffefd5", "#d3ffce"];

const Whatwillyoulearn = () => {
    const { slug } = useParams();
    const [card, setCard] = useState(null);
    const [courseID,setCourseID] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };


    useEffect(() => {
        const cardDetails = data.find(item => item.slug === slug);
        setCard(cardDetails);
        setCourseID(cardDetails.courseID);
    }, [slug]);

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.totalPage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.heading}>
                        What will you <span>Learn</span>?
                    </p>
                    <p className={styles.description}>
                        {card.Description}
                    </p>
                </div>

                <div className={styles.modules}>
                    {card.moduleContent && card.moduleContent.map((module, index) => (
                        <div
                            key={module.id}
                            className={styles.moduleContainer}
                            style={{ backgroundColor: colors[index % colors.length] }}
                        >
                            <div className={styles.moduleHeader}>
                                <p className={styles.moduleTitle}>{module.module}</p>
                                <p className={styles.moduleSubTitle}>{module.title}</p>
                            </div>

                            <div className={styles.detailsContainer}>
                                <div className={styles.details}>
                                    <div className={styles.detailItem}>
                                        <FontAwesomeIcon icon={faClock} />
                                        <p>Time: {module.details.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.descriptionsContainer}>
                                {module.details.descriptions.map((description, i) => (
                                    <p key={i} className={styles.descriptionItem}>{description}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.masterclassInfo}>
                <img loading="lazy" src={backgroundImage} alt="Background" className={styles.backgroundImage} />
                <p className={styles.masterclassQuestion}>Who is this <span>Course</span> for...?</p>
                <section className={styles.roleContainer}>
                    {card && card.courseFor.map((course, index) => (
                        <article key={index} className={styles.role}>
                            <img loading="lazy" src={course.image} alt={course.alt} className={styles.roleImage} />
                            <div className={styles.roleContent}>
                                <h3 className={styles.roleTitle}>{course.title}</h3>
                                <p className={styles.roleDescription}>{course.content}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <div className='pt-5'>
                    <h2>
                        Skill Up Now, Pay in Easy Installments! –
                        <span style={{ color: '#ff5003' }}>
                            {courseID ===  8 ? "" : courseID === 1 ? "₹3,500/month EMIs" : "₹2,999/month EMIs"}
                        </span>
                        <button className={`${Buttonstyle.shinebtn} btn`} onClick={togglePopup}>
                            Get Details
                        </button>
                    </h2>
                    {isPopupVisible && <SignInForm onClose={togglePopup} actionType="Button:pricing Details" />}
                </div>
            </div>
        </div>
    );
};

export default Whatwillyoulearn;
