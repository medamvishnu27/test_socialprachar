import React from 'react'
import loadingStyle from './loading.module.css'

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className={loadingStyle.loader}>
     
    </div>
    </div>
  )
}

export default Loading;
