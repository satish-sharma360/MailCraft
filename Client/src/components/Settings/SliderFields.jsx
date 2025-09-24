import React from "react";

const SliderFields = ({ label, value, onStyleChange ,type = 'px', min = 0, max = 100  }) => {
  const formattedValue = (value) => {
    return Number(value.toString().replace(type, ""));
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-3">
        <input 
          type="range" 
          min={min}
          max={max}
          value={formattedValue(value)} 
          onChange={(e) =>onStyleChange(e.target.value+type)}
          className=""
        />
        <span className="text-xs text-gray-500 min-w-[40px]">
          {formattedValue(value)}{type}
        </span>
      </div>
    </div>
  );
};

export default SliderFields;
