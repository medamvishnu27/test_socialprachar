import React from 'react'
import BulbText from '../extraComponents/bulbText'
import MarqueeComp from '../extraComponents/marqueeComp'
import commentOne from '../../assets/comments (1).png'
import commentTwo from '../../assets/comments (2).png'
import commentThree from '../../assets/comments (3).png'
import commentFour from '../../assets/comments (4).png'
import commentFive from '../../assets/comments (5).png'
import commentSix from '../../assets/comments (6).png'
import commentSeven from '../../assets/comments (7).png'
import commentEight from '../../assets/comments (8).png'
import commentNine from '../../assets/comments (9).png'
import commentsStyle from './comments.module.css'

const Comments = () => {

  const CommentsArray=[commentOne,commentTwo,commentThree,commentFour,commentFive,commentSix,commentSeven,commentEight,commentNine]

  return (
    <div className='containerFluidForPadding my-5'>
      <div className={commentsStyle.BulbTextStyle}>
        <BulbText BulbText="Our Top Comments"
          bulbTitle="Our Alumini Comments"
          GreyText="You'll find something to spark your curiosity and enhance"/>
      </div>
      <div >
        <MarqueeComp MarqueeArray={CommentsArray}/>
      </div>
    </div>
  )
}

export default Comments;
