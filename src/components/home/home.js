import React from "react";
import homeStyle from "./home.module.css";
import bulb from "../../assets/bulb.png";
import homepic01 from "../../assets/replaceHomw.png";
import iconPicOne from "../../assets/smallPicOne.png";
import iconPicTwo from "../../assets/smallPicTwo.png";
import iconPicThree from "../../assets/smallPicThree.png";
import flowtingBtn from '../../assets/flowtingBtn.png'
import ArrowButton from "../extraComponents/arrowButton";
import ParallaxEffect from '../extraComponents/ParallaxEffect'
import SvgBulb from '../../assets/bulbSvg.png'
import dumbelSvg from '../../assets/dumbel.png'
import BookSvg from '../../assets/book.png'
import flowtingBtn2 from '../../assets/noOfCourses.png'

import yellowLine from '../../assets/yellowLine.png'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const images = [
    {
      src: dumbelSvg,
      className: 'objectOne',
      dataValue: '5', alt: 'Image 1'
    },
    {
      src: BookSvg,
      className: 'objectTwo',
      dataValue: '5', alt: 'Image 2'
    },
    {
      src: SvgBulb,
      className: 'objectThree',
      dataValue: '5', alt: 'Image 3'
    },
  ];
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate('/courses');
  }

  return (
    <>
      <div className="main-container container-fluid" id="forFooterBtn">
        {/* <ParallaxEffect images={images} /> */}
        <div className={`row containerFluidForPadding bg-body-tertiary forHoverEffect`}>
          {/* content side of home code starts */}
          <div className={`col-md-6 col-lg-6 col-xl-6 ${homeStyle.homeLeftSide}`} >
            <div>
              <div className="d-flex">
                <span className='bulbSpan'>
                  <img src={bulb} />
                </span>
                <p className="blueText">Your Journey To a Dream Job Starts Here</p>
              </div>
              <p className={`${homeStyle.title}`}>
                Unlock Your Potential with SocialPrachar

              </p>
              <img src={yellowLine} alt="yellowLine" className={`${homeStyle.yellowLine} `} />
              <br />
              <p className="greyText ">
                Discover a world of knowledge and opportunities with our Mentor job-ready courses.
              </p>

              <div className="row mt-4">
                <div className="col-12 col-sm-12 col-xl-5 align-center">
                  <ArrowButton ArrowText='View All Courses' handleClick={handleClick} />
                </div>
                <div className="col-12 col-sm-12 col-xl-6 d-flex justify-content-around">
                  <div className={`${homeStyle.imgIcons} d-flex`}>
                    <img src={iconPicOne} />
                    <img src={iconPicTwo} className={`${homeStyle.secondIconImg}`} />
                    <img src={iconPicThree} className={`${homeStyle.thirdIconImg}`} />
                    <div className={`${homeStyle.plusIcon}`}>+</div>
                  </div>
                  <div>
                    <p className={`${homeStyle.studentNoText}`}>16000+ students</p>
                    <p className="greyText">
                      Strong Alumni
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* content side of home code ends */}

          <div className={`${homeStyle.homeRightSide} col-md-6 col-lg-6 col-xl-6 `} >

            <div className={`${homeStyle.forFlowingBtn}`}>

              <div className={`${homeStyle.flowtingLeftBtn}`}>
                <img src={flowtingBtn} />
                <div >
                  <span className={`${homeStyle.flowtingBtnFirst}`}>4.8</span><br />
                  <span className={`${homeStyle.flowtingBtnGreyText}`}>{"("}4.8k reviews{")"}</span>
                </div>
              </div>


              <div className={`${homeStyle.flowtingRightBtn}`}>

                <img src={flowtingBtn2} />
                <div >
                  <span className={`${homeStyle.flowtingBtnFirst}`}>20+</span><br />
                  <span className={`${homeStyle.flowtingBtnGreyText}`}>{"("}job ready Courses{")"}</span>
                </div>
              </div>



            </div>
            <div>

            </div>

            <img src={homepic01} className={`${homeStyle.homePic}`} />
          </div>

        </div>

      </div>

    </>
  );
};

export default Home;
