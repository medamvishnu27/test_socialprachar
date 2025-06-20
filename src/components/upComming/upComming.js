import React from "react";

import upCommingStyle from '../upComming/upComming.module.css'
import ArrowButton from "../extraComponents/arrowButton";
import BulbText from "../extraComponents/bulbText";

import upcommingEventsArray from '../extraComponents/upcommingEventsArray'


const UpComming = () => {


  const handleClick=(ZoomLink)=>{
    window.open(ZoomLink,"_blank");
  }

  return (
    <>
      <div className={`container py-5 ${upCommingStyle.containerXl}`}>
        <div className="d-flex justify-content-center">
          <div className={`${upCommingStyle.upCommingCenterText}`} >

          <BulbText
          BulbText="Our Webinars"
          bulbTitle="Upcoming Free Webinars"
          GreyText="You'll find something to spark your curiosity and enhance"
        />
          </div>
        </div>

        <div className={` row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 `}>

        {
            
            upcommingEventsArray.map((upCommingEvent,i)=>(

            <div className={`col `}   key={i} 
            >
              <div className={`${upCommingStyle.upcommingCard}`} >

              <img src={upCommingEvent.upcommingImgOne} />

              <div className={` ${upCommingStyle.rowUpcommingCard} `}>
               

                <div>
                <div className={`${upCommingStyle.upcommingCardFirstText} mt-3`}>
                  <p><i className="bi bi-stopwatch"></i>&nbsp;
                  90 Minutes</p>
                  <p>
                  <i className="bi bi-camera-video"></i>&nbsp;
                  Zoom Webinar</p>
                  
                </div>
                <div className={`${upCommingStyle.upcommingCardSecondText}`} >
                <p> Join Our Career Orientation Class On &nbsp;
                  {upCommingEvent.BigText}
                  </p>
                  
                </div>
              </div>
                

                <div className=" ArrowBtn d-flex justify-content-end">
             
              <ArrowButton ArrowText='Enroll Now' handleClick={()=>{handleClick(upCommingEvent.ZoomLink)}}/>

                </div>
              </div>

              </div>

              
            </div>
            ))

        }
          </div>

      </div>
    </>
  );
};

export default UpComming;
