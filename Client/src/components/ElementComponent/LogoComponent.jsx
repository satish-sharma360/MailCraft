import React from 'react'

const LogoComponent = ({imageUrl,alt ,url,style ,outerStyle}) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} alt={alt} style={style}/>
    </div>
  )
}

export default LogoComponent
