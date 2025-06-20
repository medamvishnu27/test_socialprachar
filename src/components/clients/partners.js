import React from 'react'
import ImgOne from '../../assets/one.png'
import ImgTwo from '../../assets/two.png'
import ImgThree from '../../assets/three.png'
import ImgFour from '../../assets/four.png'
import ImgFive from '../../assets/five.png'
import ImgSix from '../../assets/six.png'
import ImgSeven from '../../assets/seven.png'
import ImgEight from '../../assets/eight.jpg'
import Imgnine from '../../assets/nine.png'
import ImgTen from '../../assets/ten.jpg'
import ImgEleven from '../../assets/eleven.jpg'
import ImgTwelve from '../../assets/twelve.jpg'
import ImgThirteen from '../../assets/thirteen.webp'
import ImgFourteen from '../../assets/fourteen.jpg'
import ImgFifteen from '../../assets/fifteen.jpg'
import MarqueeComp from '../extraComponents/marqueeComp';
import PartnerStyle from '../clients/Partner.module.css'
import BulbText from '../extraComponents/bulbText'
const partners = () => {
    const PartnersArray=[ImgOne,ImgTwo,ImgThree,ImgFour,ImgFive,ImgSix,ImgSeven,ImgEight,Imgnine,ImgTen,ImgEleven,ImgTwelve,ImgThirteen,ImgFourteen,ImgFifteen]
  return (
    <div className='containerFluidForPadding my-5'> 
      <div className={PartnerStyle.BulbTextStyle}>
      <BulbText
          BulbText="Our Top Clients"
          bulbTitle="Our Hiring Partners"
          GreyText="You'll find something to spark your curiosity and enhance"
        />
      </div>

      <div className={PartnerStyle.ImagesSize}>
        <MarqueeComp MarqueeArray={PartnersArray}/>
      </div>
    

    </div>
  )
}

export default partners

