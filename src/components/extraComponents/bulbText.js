import React from 'react'
import bulb from '../../assets/bulb.png'


const BulbText = (props) => {
  return (
    <div style={{whiteSpace:'pre-wrap'}} >
      
       <span className="bulbSpan">
            <img src={props.whiteBulb?props.whiteBulb:bulb} />
          </span>
          <p className="blueText d-inline">{props.BulbText}</p>
          <br />
          <p className="gateWaytitle">{props.bulbTitle}
          </p>
          <p className="greyText d-block my-3" >{props.GreyText}
          </p>
    </div>
  )
}

export default BulbText
