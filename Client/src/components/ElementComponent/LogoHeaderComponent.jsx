import React from 'react'

const LogoHeaderComponent = ({imageUrl,alt ,url ,style,outerStyle}) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} alt={alt} style={style}/>
    </div>
  )
}

export default LogoHeaderComponent
