import React from 'react'

const TextComponent = ({style ,textarea}) => {
  return (
    <div>
      <h1 style={style}>{textarea}</h1>
    </div>
  )
}

export default TextComponent
