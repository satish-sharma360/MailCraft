import React from 'react'

const SocialIconsComponent = ({socialIcons,style ,outerStyle}) => {
  return (
    <div style={outerStyle}>
        {socialIcons.map((iconObj, index) => (
        <a key={index} href={iconObj.url} target="_blank" rel="noopener noreferrer">
          <img
            src={iconObj.icon}
            alt={`social-icon-${index}`}
            style={style}
          />
        </a>
      ))}
    </div>
  )
}

export default SocialIconsComponent
