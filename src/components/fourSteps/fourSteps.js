import React, { useState, useEffect } from 'react';
import fourImageOne from '../../assets/fourStep (1).png';
import fourImageTwo from '../../assets/fourStep (2).png';
import fourImageThree from '../../assets/fourStep (3).png';
import fourImageFour from '../../assets/fourStep (4).png';
import circleSvg from '../../assets/circleSvg.png';
import wavesPic from '../../assets/waves.png';
import ParallaxEffect from "../extraComponents/ParallaxEffect";
import fourStepsStyle from '../fourSteps/fourStep.module.css'


const FourSteps = () => {
  const fourStepsArray = [
    {
      fourImg: fourImageOne,
      fourFirstText: 155000,
      fourSecondText: `Hours Classes \n Delivered`
    },
    {
      fourImg: fourImageTwo,
      fourFirstText: 530,
      fourSecondText: 'Batches Completed'
    },
    {
      fourImg: fourImageThree,
      fourFirstText: 16000,
      fourSecondText: 'Students Trained'
    },
    {
      fourImg: fourImageFour,
      fourFirstText: 9,
      fourSecondText: `Prestigious EdTech \n Award Received`
    }
  ];

  const images = [
    { src: wavesPic, className: 'objectOne', dataValue: '5', alt: 'Image 1' },
    { src: circleSvg, className: 'objectTwo', dataValue: '5', alt: 'Image 2' }
  ];

  const [currentNumbers, setCurrentNumbers] = useState(fourStepsArray.map(() => 0));

  useEffect(() => {
    const intervals = fourStepsArray.map((step, index) => {
      return setInterval(() => {
        setCurrentNumbers(prevNumbers => {
          const newNumbers = [...prevNumbers];
          if (newNumbers[index] < step.fourFirstText) {
            newNumbers[index] += 100;
            if (newNumbers[index] > step.fourFirstText) {
              newNumbers[index] = step.fourFirstText;
            }
          } else {
            clearInterval(intervals[index]);
          }
          return newNumbers;
        });
      }, 1); 
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [fourStepsArray]);

  return (
    <>
      <div className='fourStepsHover container-fluid mt-5'>
        <div className={` row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 ${fourStepsStyle.fourStepContainer} py-4 `}>
          {fourStepsArray.map((fourStepEle, i) => (
            <div className={`col ${fourStepsStyle.fourStep}`} key={i}>
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={fourStepEle.fourImg}
                  alt="Step"
                  className="mx-auto d-block"
                />
                <p className={`${fourStepsStyle.fourStepTextOne}`}>
                  {currentNumbers[i]}<span style={{ fontSize: '30px' }}>+</span>
                </p>
                <p style={{ whiteSpace: 'pre-wrap' }}>{fourStepEle.fourSecondText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FourSteps;
