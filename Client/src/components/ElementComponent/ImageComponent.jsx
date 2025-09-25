import React from 'react'

const ImageComponent = ({imageUrl, alt, url, style, outerStyle}) => {
  return (
    <div style={{ ...outerStyle }}>
      <a href={url}>
        <img
          src={imageUrl}
          alt={alt}
          style={{
            ...style,
            objectFit: style?.objectFit || "contain",
            objectPosition: style?.objectPosition || "center",
            display: "block",
          }}
        />
      </a>
    </div>
  )
}

export default ImageComponent
