import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './UpcomingBatches.module.css';
import Asidecard from './aside/Asidecard.js';
import navbarImage from '../../assets/careerworkshop/all banner.png';
import masterAd_DS from '../../assets/careerworkshop/Master adv ds.png';
import masterAd_DM from '../../assets/careerworkshop/Master adv dm.png';
import masterAd_Devops from '../../assets/careerworkshop/Master adv devops.png';
import masterDA from '../../assets/careerworkshop/Master DA.png';
import masterDS from '../../assets/careerworkshop/Master DS.png';
import masterFS from '../../assets/careerworkshop/Master FS.png';
import masterFSJ from '../../assets/careerworkshop/Master FSJ.png';
import masterFSP from '../../assets/careerworkshop/Master FSP.png';
import Footer from './../footer/footer.js';
import { useDateContext } from '../Forms/DateContext.js';
import { Helmet } from 'react-helmet-async';

function formatDateWithSuffix(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-IN", { month: "long" });
    const year = date.getFullYear();

    const getOrdinalSuffix = (n) => {
        if (n > 3 && n < 21) return "th";
        switch (n % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

const UpcomingBatches = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { upcomingBatchesDate } = useDateContext();

    console.log("Upcoming Batches Date from context:", upcomingBatchesDate);

    const categories = [
        'All',
        'Full Stack Development',
        'Data Science/AI',
        'DevOps',
        'Digital Marketing',
    ];

    const cardData = [
        { id: 1, students: '5120+', no_of_Slots: 4, image: masterDS, category: 'Data Science/AI', title: 'Artificial Intelligence', route: '/artificial-intelligence-course-training-institute-in-hyderabad' },
        { id: 2, students: '3200+', no_of_Slots: 6, image: masterAd_DS, category: 'Data Science/AI', title: 'Advanced Data Science/AI', route: '/data-science' },
        { id: 3, students: '4600+', no_of_Slots: 5, image: masterDA, category: 'Data Science/AI', title: 'Data Analytics (Mastery)', route: '/data-analytics-course-training-hyderabad' },
        { id: 4, students: '3800+', no_of_Slots: 7, image: masterFSJ, category: 'Full Stack Development', title: 'Full Stack Java', route: '/java-full-stack-development-course' },
        { id: 5, students: '4300+', no_of_Slots: 4, image: masterFSP, category: 'Full Stack Development', title: 'Full Stack Python', route: '/python-full-stack-development-course' },
        { id: 6, students: '4400+', no_of_Slots: 6, image: masterFS, category: 'Full Stack Development', title: 'MERN Stack (Full Stack)', route: '/full-stack-developer-course' },
        { id: 7, students: '3120+', no_of_Slots: 5, image: masterAd_Devops, category: 'DevOps', title: 'Multi Cloud With DevOps', route: '/awsdevopscourse' },
        { id: 8, students: '4500+', no_of_Slots: 5, image: masterAd_DM, category: 'Digital Marketing', title: 'Advanced Digital Marketing', route: '/digital-marketing-course-training-institute-hyderabad' },
    ];

    // Update startDate dynamically
    // const updatedCardData = cardData.map(card => ({
    //     ...card,
    //     startDate: upcomingBatchesDate[card.id] || "Not Mentioned", 
    // }));

    const updatedCardData = cardData.map(card => ({
        ...card,
        startDate: upcomingBatchesDate[card.id]
            ? formatDateWithSuffix(upcomingBatchesDate[card.id])
            : "Not Mentioned",
    }));

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredCards = selectedCategory === 'All' ? updatedCardData : updatedCardData.filter(card => card.category === selectedCategory);

    return (
        <>
            <Helmet>
                <title>Upcoming Batches Learn Tech Concepts From Industry Leaders | social parchar</title>
            </Helmet>
            <div className={style.container}>
                <div className={`${style.bg} container pt-5`}>
                    <div className="text-start d-flex flex-wrap align-items-center justify-content-between text-white">
                        <div>
                            <h1>Upcoming Batches</h1>
                            <p className="fw-bold">Learn Tech Concepts From Industry Leaders Who Have Been There and Done That!</p>
                        </div>
                        <div>
                            <img src={navbarImage} alt="Masterclass" className={style.custom_image} />
                        </div>
                    </div>

                    <div className="d-flex flex-wrap justify-content-start mb-4 bg-light p-1 rounded">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`btn mx-2 mb-2 ${selectedCategory === category ? style.active_category : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                {filteredCards.map(card => (
                                    <div className="col-md-6 mb-4 shadow" key={card.id}>
                                        <div className="card" style={{ width: '100%' }}>
                                            <img
                                                src={card.image}
                                                className="card-img-top img-fluid"
                                                alt={card.title}
                                                style={{ height: '160px', backgroundPosition: 'center' }}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{card.title}</h5>
                                                <p className="card-text mb-1">
                                                    Batch Starting Date: <span className="fw-bold">{card.startDate}</span>
                                                </p>
                                                <h6 className="text-danger">Hurry, only {card.no_of_Slots} slots remaining!</h6>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <h6 className={style.studentsEnrolledText}>Students Registered: {card.students}</h6>
                                                    <a href={card.route} className={`fw-bold btn ${style.enrollBtn}`}>
                                                        Enroll Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={style.sticky_asidecard}>
                                <Asidecard />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default UpcomingBatches;
