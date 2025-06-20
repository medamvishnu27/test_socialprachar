import React, { useEffect, useRef, useState } from 'react';
import courseCSS from './Course.module.css';
import img from '../../assets/01-5.jpg';
import { data } from '../Cards/CardData';
import Cards from '../Cards/Cards';
import ToggleBar from '../Togglebar/ToggleBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Footer from '../footer/footer';
import { Helmet } from 'react-helmet-async';

export const items = [
    'Data Science',
    'Advanced Full Stack',
    'Python Development',
    'Java Development',
    'Analytics',
    'AWS DevOps',
    'Digital Marketing',
    'Artificial Intelligence',
    'Generative AI',
    'SnowFlake Course',
    'SalesForce',
];

export const Tag = ['Web Development', 'Job Guarantee Programs', 'Cloud',];

const Course = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const { category } = location.state || {};

    const [checked, setChecked] = useState(new Array(items.length).fill(false));
    const [showUncheckedShadow, setShowUncheckedShadow] = useState(new Array(items.length).fill(false));

    const [checkedTags, setCheckedTags] = useState(new Array(Tag.length).fill(false));
    const [showUncheckedShadowTags, setShowUncheckedShadowTags] = useState(new Array(Tag.length).fill(false));

    const [showButton, setShowButton] = useState(false);
    const [refreshCards, setRefreshCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);

    const containerRef = useRef(null);

    const clearFilters = () => {
        setChecked(new Array(items.length).fill(false));
        setCheckedTags(new Array(Tag.length).fill(false));
        setRefreshCards(true);
    };

    const handleClick = () => {
        clearFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        if (scrollTop > viewportHeight / 2) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShowUncheckedShadow(new Array(items.length).fill(false));
            setShowUncheckedShadowTags(new Array(Tag.length).fill(false));
        }
    };

    const handleCheckboxClick = (index) => {
        const updatedChecked = checked.map((item, i) => i === index ? !item : item);
        setChecked(updatedChecked);
        const selectedCategories = items.filter((item, i) => updatedChecked[i]);
        const filteredCardsTemp = data.filter((card) => selectedCategories.includes(card.category));
        setFilteredCards(filteredCardsTemp.length > 0 ? filteredCardsTemp : data);

        if (!updatedChecked[index]) {
            setRefreshCards(false);
        } else {
            setRefreshCards(true);
        }

        // Update the Cards component with the filtered cards
        <Cards filters={{ checkedCategories: updatedChecked, checkedTags }} cards={filteredCards} />;
    };

    useEffect(() => {
        if (category) {
            const categoryIndex = items.indexOf(category);
            if (categoryIndex !== -1) {
                const updatedChecked = items.map((_, index) => index === categoryIndex);
                setChecked(prevChecked => {
                    // Only update if the state is actually different to avoid re-renders
                    if (JSON.stringify(prevChecked) !== JSON.stringify(updatedChecked)) {
                        return updatedChecked;
                    }
                    return prevChecked;
                });
            }
        }
    }, [category]);


    const handleTagCheckboxClick = (index) => {
        const updatedCheckedTags = checkedTags.map((item, i) => i === index ? !item : item);
        setCheckedTags(updatedCheckedTags);
        const updatedShowUncheckedShadowTags = updatedCheckedTags.map((item, i) => i === index && !item);
        setShowUncheckedShadowTags(updatedShowUncheckedShadowTags);
    };

    useEffect(() => {
        handleScroll();
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <Helmet>
                <title>12+ Job Ready Courses – Learn Till You Get Placed | SocialPrachar</title>
                <meta name="description" content="Leading training institute in Hyderabad offering professional courses in Data Science, Full Stack, AWS DevOps, AI, Digital Marketing with placement guarantee. Transform your career with expert-led training, real-time projects, and 100% job assistance." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://socialprachar.com/courses" />
                <meta property="og:title" content="Professional Training Courses in Hyderabad | Social Prachar" />
                <meta property="og:description" content="Transform your career with SocialPrachar's expert-led training programs in Hyderabad. Choose from Data Science, Full Stack, DevOps, AI, and Digital Marketing courses with guaranteed placements." />
                <meta property="og:image" content="https://socialprachar.com/path-to-courses-og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://socialprachar.com/courses" />
                <meta name="twitter:title" content="Professional Training Courses in Hyderabad | Social Prachar" />
                <meta name="twitter:description" content="Transform your career with SocialPrachar's expert-led training programs in Hyderabad. Choose from Data Science, Full Stack, DevOps, AI, and Digital Marketing courses with guaranteed placements." />
                <meta name="twitter:image" content="https://socialprachar.com/path-to-courses-twitter-image.jpg" />
            </Helmet>
            <div className={courseCSS.categorypage}>
                <div className={courseCSS.cover_img}>
                    <img src={img} className={courseCSS.thumbnail} alt="" />
                    <h1>Courses</h1>
                </div>

                <ToggleBar
                    items={items}
                    Tag={Tag}
                    checked={checked}
                    setChecked={setChecked}
                    showUncheckedShadow={showUncheckedShadow}
                    setShowUncheckedShadow={setShowUncheckedShadow}
                    checkedTags={checkedTags}
                    setCheckedTags={setCheckedTags}
                    showUncheckedShadowTags={showUncheckedShadowTags}
                    setShowUncheckedShadowTags={setShowUncheckedShadowTags}
                    clearFilters={clearFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className={courseCSS.EntirePage}>
                    <div className={courseCSS.category}>
                        {/* Duplicate filter section for non-toggle bar view */}
                        <div className={courseCSS.checkbox}>
                            <div className={courseCSS.search}>
                                <p>Search</p>
                                <div className={courseCSS.searchBar}>
                                    <input type="text" placeholder='search' />
                                    <button className={courseCSS.searchIcon}><FontAwesomeIcon icon={faSearch} /></button>
                                </div>
                            </div>
                            <hr />
                            {/* Category part */}
                            <div className={courseCSS.categories}>
                                <h5>Course</h5>
                                {items.map((item, index) => (
                                    <div key={index} className={courseCSS.categorypart}>
                                        <input
                                            type="checkbox"
                                            id={`acc-${index}`}
                                            checked={checked[index]}
                                            onChange={() => handleCheckboxClick(index)}
                                            className={`${checked[index] ? courseCSS.shadow : showUncheckedShadow[index] ? courseCSS.unchecked_shadow : ''}`}
                                        />
                                        <label htmlFor={`acc-${index}`}><p>{item}</p></label>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            {/* Tag part */}
                            <div className={courseCSS.categories}>
                                <h5>Catogery</h5>
                                {Tag.map((tag, index) => (
                                    <div key={index} className={courseCSS.categorypart}>
                                        <input
                                            type="checkbox"
                                            id={`tag-${index}`}
                                            checked={checkedTags[index]}
                                            onChange={() => handleTagCheckboxClick(index)}
                                            className={`${checkedTags[index] ? courseCSS.shadow : showUncheckedShadowTags[index] ? courseCSS.unchecked_shadow : ''}`}
                                        />
                                        <label htmlFor={`tag-${index}`}><p>{tag}</p></label>
                                    </div>
                                ))}
                            </div>
                            <hr />

                            <div className={courseCSS.button}>
                                <button className={courseCSS.btn} onClick={handleClick}>&#x2715;&nbsp;&nbsp;&nbsp;&nbsp;Clear All Filters</button>
                            </div>
                        </div>
                    </div>
                    <div className={courseCSS.CardsSection}>
                        <Cards
                            filters={{
                                checkedCategories: checked,
                                checkedTags,

                            }} />
                    </div>
                    {showButton && (
                        <button className={courseCSS.scrollButton} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <span>&#10095;&#10095;</span>
                        </button>
                    )}
                </div>
            </div>
            <Footer />

        </>

    );
};

export default Course;
