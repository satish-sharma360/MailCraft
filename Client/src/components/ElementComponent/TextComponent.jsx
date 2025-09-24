import React from 'react'

const TextComponent = ({style ,textarea ,outerStyle}) => {
  return (
    <div style={outerStyle} >
      <h1 style={style}>{textarea}</h1>
    </div>
  )
}

export default TextComponent
