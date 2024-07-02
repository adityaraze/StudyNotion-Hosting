import React from 'react'
import HighlightText from '../HighlightText'

const Quote = () => {
  return (
    <div>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology "}/>
        <span className='txtgrad'>
            experties {" "}
        </span>
        and community to create an {" "} 
        <span className='txtgrad'>
        unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote