import React from 'react'
import Marquee from "react-fast-marquee";


const MarqueeComp = ({ MarqueeArray }) => {
  return (
    <div>
      <Marquee direction="left" speed={100} pauseOnHover={true} >
        {
          MarqueeArray.map((image, i) => (
            <div className="image_wrapper mx-5" key={i}>
              <img src={image} alt="imgOfCompany" />
            </div>

          ))
        }

      </Marquee>
    </div>
  )
}

export default MarqueeComp;
