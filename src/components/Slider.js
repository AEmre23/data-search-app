import React,{useState} from 'react'
import navigator from '../assets/next.png'
import sliderImage from '../assets/slider-image.png'

const Slider = () => {
  const [slideView,setslideView ] = useState(3)
  const sliderContent = [
    [
    sliderImage,
    'Text 1:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '2h ago · by Troy Corlson'
    ],
    [
    sliderImage,
    'Text 2:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '1h ago · by Alex Corlson'
    ],
    [
    sliderImage,
    'Text 3:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '7h ago · by Tom Corlson'
    ],
    [
    sliderImage,
    'Text 4:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '3h ago · by Hank Corlson'
    ],
    [
    sliderImage,
    'Text 5:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '13h ago · by Tim Corlson'
    ],
    [
    sliderImage,
    'Text 6:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '1h ago · by Jim Halpert'
    ],
    [
    sliderImage,
    'Text 7:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '23h ago · by Dwight Schrute'
    ],
    [
    sliderImage,
    'Text 8:A Plan to Rebuild the Bus Terminal Everyone Loves to Hate',
    '7h ago · by Michael Scott'
    ],
  ]

  const goNext = () => {
    if (slideView !== sliderContent.length) setslideView(prevValue => prevValue + 1)
  }
  const goPrevious = () => {
    if (slideView !== 3) setslideView(prevValue => prevValue - 1)
  }

  return (
    <>
    <div className="slider-header">Top News</div>
    <div className="slider-wrapper">
      <div className="slider">
        {sliderContent.slice(slideView-3,slideView).map((each,i) => (
          <div className='content' key={i}>
            <div className="content-image"><img src={each[0]} alt='slider-mockup'/></div>
            <div className="content-text">{each[1]}</div>
            <div className="content-subtext">{each[2]}</div>
          </div>
        ))}
      </div>
      <div onClick={goPrevious} className="previous-button">
        <img src={navigator} alt='navigate-icon' />
      </div>
      <div onClick={goNext} className="next-button">
        <img src={navigator} alt='navigate-icon' />
      </div>
    </div>
    </>
  )
}

export default Slider
