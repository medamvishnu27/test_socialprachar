import React from "react";
import circleColImg1 from '../../assets/circleAniImg1.png'
import circleColImg2 from '../../assets/circleAniImg2.png'
import circleColImg3 from '../../assets/circleAniImg3.png'
import circleColImg4 from '../../assets/circleAniImg4.png'
import circleColImg5 from '../../assets/circleAniImg5.png'
import circleColImg6 from '../../assets/circleAniImg6.png'
import leftImg from "../../assets/circleimgleft.jpg";
import rightImg from "../../assets/circleimgRight.png";
import ArrowButton from "../extraComponents/arrowButton";
import BulbText from "../extraComponents/bulbText";
import whiteBulb from '../../assets/whiteBulb.png'
import circleAnimationStyle from '../circleAmination/circleAnimation.module.css'

import wavesPic from '../../assets/waves.png'
import BookSvg from '../../assets/book.png'
import ParallaxEffect from "../extraComponents/ParallaxEffect";
import { useNavigate } from "react-router-dom";



const CircleAnimation = () => {

  const images = [
    {
      src: wavesPic,
      className: 'objectOne',
      dataValue: '5', alt: 'Image 1'
    },
    {
      src: BookSvg,
      className: 'objectTwo',
      dataValue: '5', alt: 'Image 2'
    }
  ];

  var circleAnimationArray = [
    {
      circleImg: circleColImg1,
      circleText: 'Expert Instructors'
    }, {
      circleImg: circleColImg2,
      circleText: 'Interactive Learning'
    }, {
      circleImg: circleColImg3,
      circleText: 'Affordable Learning'
    }, {
      circleImg: circleColImg4,
      circleText: 'Career Advance'
    }, {
      circleImg: circleColImg5,
      circleText: 'Course Selection'
    }, {
      circleImg: circleColImg6,
      circleText: 'Support Community'
    }];

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/courses');
  }

  return (
    <>
      <div className={`${circleAnimationStyle.circleAnimationContainer} container-fluid `} id="circleAnimationHover">
        <ParallaxEffect images={images} />

        <div className="row    containerFluidForPadding ">
          {/* left side box code start */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div className={`${circleAnimationStyle.leftSideOfCircleAni}`} >


              <div className={`${circleAnimationStyle.leftImg}`} >
                <img src={leftImg} />
              </div>

              <div className={`${circleAnimationStyle.rightImg}`} >
                <img src={rightImg} />
              </div>
            </div>
          </div>
          {/* left side box code end */}
          {/* right side box code start */}

          <div className={`col-12 col-sm-12 col-md-12  col-lg-6 col-xl-6  mt-5 ${circleAnimationStyle.rightSideOfCircleAni} `} >
            <span className={circleAnimationStyle.whiteBulb}>

              <BulbText whiteBulb={whiteBulb}
                BulbText='Why Choose Us'
                bulbTitle={`Social Prachar - Your Path to\nExcellence & Success`}
                GreyText={`We are passionate about education and dedicated to \n providing high-quality learning resources for learners of all backgrounds.`} />

            </span>

            <div className={`row row-cols-2 row-col-sm-2 row-cols-lg-4 row-cols-xl-3 py-4 row-gap-4 ${circleAnimationStyle.circleAnimationRowDiv}`}>

              {
                circleAnimationArray.map((circleAnimationDivItem, i) => (
                  <div className={`${circleAnimationStyle.circleAnimationDiv}  col`} key={i}>
                    <img src={circleAnimationDivItem.circleImg} />
                    <p>
                      {circleAnimationDivItem.circleText}
                    </p>
                  </div>
                ))
              }



            </div>


            <div className={`${circleAnimationStyle.whiteBtn}`} >

              <ArrowButton ArrowText='View All Courses' handleClick={handleClick} />

            </div>
          </div>
          {/* right side box code end */}
        </div>
      </div>

    </>
  );
};

export default CircleAnimation;
