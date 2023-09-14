import React from "react";
import "./radio.scss"

const Radio = ({ type,options, selectedValue, onChange,className }) => {
  return (
    <div className="radio-container">
      {options.map((option, index) => (
        <label key={index}>
          <input
            type={type}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className={className}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;
