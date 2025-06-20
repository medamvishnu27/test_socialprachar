import React from 'react';
import emptystate from '../../../assets/emptystate.svg'
import style from './orderHistory.module.css'

const OrderHistory = () => {
    return (
        <div className='container-fluid p-3 mb-4'>
        <h3>Order History</h3>
        <div className='row' style={{display:'flex',justifyContent:'space-between'}}>
            <div className='col-12 col-lg-7 col-sm-12'>
        <button className={`btn ${style.orderHistoryButton}`}>Today</button>
        <button className={`btn ${style.orderHistoryButton}`}>Monthly</button>
        <button className={`btn ${style.orderHistoryButton}`}>Yearly</button>
            </div>
        <div className='col-12 col-lg-5 col-sm-12' >
        <input type='date' className='form-control'></input>
        </div>
        </div>
        <img src={emptystate} alt='emptystate-Image' className={style.EmptyStateImg}></img>
        <p style={{textAlign:'center'}}>No Data Available in this Section</p> 
        </div>
    );
};

export default OrderHistory;