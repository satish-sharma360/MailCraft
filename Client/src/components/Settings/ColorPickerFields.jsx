import React from 'react'

const ColorPickerFields = ({onStyleChange , label ,value}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label>{label}</label>
      <input className='w-24 h-8 cursor-pointer' type="color" value={value}
        onChange={(e) => onStyleChange(e.target.value)} />
    </div>
  )
}

export default ColorPickerFields
