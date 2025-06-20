import React from 'react'
import FourSteps from './fourSteps/fourSteps.js';
import UpComming from './upComming/upComming.js';
import TopCatogery from './topCatogery/topCatogery.js';
import FooterBtn from './footerButton/footerBtn.js';
import Footer from './footer/footer.js';
import CircleAnimation from './circleAmination/circleAnimation.js';
import Partner from './clients/partners.js';
import Home from './home/home.js';
import EnrollDetails from './enrollDetails/enrollDetails.js';
import HomeCourse from './HomeCardComp/HomeCourses.js';
import Comments from './comments/comments.js';
import NewsOnUs from './newsArticles/newsOnUs.js';


const AllHomeComp = () => {

  return (
    <div>
      <Home/>
      <FourSteps/>
      <Partner/>
      <EnrollDetails/>
      <NewsOnUs />
      <TopCatogery/>
      <HomeCourse/>
      <CircleAnimation/>
      <UpComming/>
      <Comments />
      <FooterBtn/>
      <Footer/>
    </div>
  )
}

export default AllHomeComp;

