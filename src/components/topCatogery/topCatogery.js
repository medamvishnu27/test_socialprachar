import React from 'react'
import BulbText from '../extraComponents/bulbText'
import SwipperTop from './swipperTop'
import ParallaxEffect from '../extraComponents/ParallaxEffect'

import topCatogeryStyle from '../topCatogery/topCatogery.module.css'

import SvgBulb from '../../assets/bulbSvg.png'
import wavesPic from '../../assets/waves.png'
import BookSvg from '../../assets/book.png'

const TopCatogery = () => {
  const images = [
    { src: wavesPic,
      className:'objectOne',
       dataValue: '5', alt: 'Image 1' },
    { src: BookSvg,
      className:'objectTwo', 
      dataValue: '5', alt: 'Image 2' },
    { src: SvgBulb,
      className:'objectThree',
       dataValue: '5', alt: 'Image 3' },
  ];
  return (

    <>
    <div className='topCategoryForHover '>

   
    <div className='containerFluidForPadding'>
        <div className="d-flex justify-content-center">
          <div className={`${topCatogeryStyle.TopCategoryCenterText}`}>

          <BulbText
          BulbText="Top Category"
          bulbTitle="Explore 20+ Job Ready Courses"
          GreyText="You'll find something to spark your curiosity and enhance"
        />
          </div>
        </div>

        <div className={`${topCatogeryStyle.topCategory}`} id='topCategoryParallex'>
        {/* <ParallaxEffect images={images} /> */}
          <SwipperTop/>
            
        </div>
    </div>
    </div>
    </>
  )
}

export default TopCatogery
