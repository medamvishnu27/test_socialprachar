import React from 'react';
import emptystate from '../../../assets/emptystate.svg'
import style from './Enroll.module.css'


const CompletedCourses = () => {
    return (
        <div>
        <img src={emptystate} alt='emptystate Image' className={style.emptyStateImg}></img>
        <p style={{textAlign:'center'}}>No Data Available in this Section</p>
        </div>
    );
};

export default CompletedCourses;