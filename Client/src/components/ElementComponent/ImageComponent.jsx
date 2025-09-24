import React from 'react'

const ImageComponent = ({style ,imageUrl,outerStyle,alt}) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} alt={alt} style={style}/>
    </div>
  )
}

export default ImageComponent
