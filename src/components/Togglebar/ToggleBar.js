import React, { useState, useRef } from 'react';
import ToggleBarCSS from './ToggleBar.module.css';
import courseCSS from '../Courses_category/Course.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

const ToggleBar = ({
    items,
    Tag,
    checked,
    setChecked,
    showUncheckedShadow,
    setShowUncheckedShadow,
    checkedTags,
    setCheckedTags,
    showUncheckedShadowTags,
    setShowUncheckedShadowTags,
    clearFilters,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const containerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleCheckboxClick = (index, type) => {
        const updateChecked = (currentChecked, setChecked) => {
            const updatedChecked = currentChecked.map((item, i) => i === index ? !item : item);
            setChecked(updatedChecked);
            return updatedChecked;
        };

        const updateShowUncheckedShadow = (currentShowUncheckedShadow, setShowUncheckedShadow, updatedChecked) => {
            const updatedShowUncheckedShadow = updatedChecked.map((item, i) => i === index && !item);
            setShowUncheckedShadow(updatedShowUncheckedShadow);
        };

        if (type === 'category') {
            updateShowUncheckedShadow(showUncheckedShadow, setShowUncheckedShadow, updateChecked(checked, setChecked));
        } else if (type === 'tag') {
            updateShowUncheckedShadow(showUncheckedShadowTags, setShowUncheckedShadowTags, updateChecked(checkedTags, setCheckedTags));
        }
    };

    const handleToggle = () => {
        setIsOpen(prev => !prev);
        setIsClicked(prev => !prev);
    };

    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredTags = Tag.filter(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={ToggleBarCSS.toggleBar} ref={containerRef}>
            <div className={`${ToggleBarCSS.Header} px-3 py-5`}>
                <p className="m-0">Courses</p>
                <button
                    className={`${ToggleBarCSS.toggleButton} ${isClicked ? ToggleBarCSS.Clicked : ''}`}
                    onClick={handleToggle}
                >
                    <FontAwesomeIcon icon={faSliders} className={ToggleBarCSS.btn} />
                </button>
            </div>
            <div
                className={`${ToggleBarCSS.toggleContent} ${isOpen ? ToggleBarCSS.show : ''}`}
            >
                <div className={`${ToggleBarCSS.TogglebtnContent} ${isOpen ? ToggleBarCSS.show : ''}`}>

                    <div className={ToggleBarCSS.category}>
                        <button className={ToggleBarCSS.Closebtn} onClick={() => setIsOpen(false)}>&#x2715;</button>
                        <div className={ToggleBarCSS.checkbox}>
                            <div className={courseCSS.search}>
                                <p>Search</p>
                                <div className={courseCSS.searchBar}>
                                    <input type="text" placeholder='search' />
                                </div>
                            </div>
                            <hr />

                            {/* Category part */}
                            <div className={courseCSS.categories}>
                                <h5>Category</h5>
                                {items.map((item, index) => (
                                    <div key={index} className={courseCSS.categorypart}>
                                        <input
                                            type="checkbox"
                                            id={`acc-${index}`}
                                            checked={checked[index]}
                                            onChange={() => handleCheckboxClick(index, 'category')}
                                            className={`${checked[index] ? courseCSS.shadow : showUncheckedShadow[index] ? courseCSS.unchecked_shadow : ''}`}
                                        />
                                        <label htmlFor={`acc-${index}`}><p>{item}</p></label>
                                    </div>
                                ))}
                            </div>
                            <hr />

                            {/* Tag part */}
                            <div className={courseCSS.categories}>
                                <h5>Tags</h5>
                                {Tag.map((tag, index) => (
                                    <div key={index} className={courseCSS.categorypart}>
                                        <input
                                            type="checkbox"
                                            id={`tag-${index}`}
                                            checked={checkedTags[index]}
                                            onChange={() => handleCheckboxClick(index, 'tag')}
                                            className={`${checkedTags[index] ? courseCSS.shadow : showUncheckedShadowTags[index] ? courseCSS.unchecked_shadow : ''}`}
                                        />
                                        <label htmlFor={`tag-${index}`}><p>{tag}</p></label>
                                    </div>
                                ))}
                            </div>
                            <hr />

                    
                            <div className={courseCSS.button}>
                                <button className={courseCSS.btn} onClick={clearFilters}>&#x2715;&nbsp;&nbsp;&nbsp;&nbsp;Clear All Filters</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleBar;
