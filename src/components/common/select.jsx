import React from "react";

const Select = ({ name, value, label, options, onChange }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        className="form-control"
        onChange={onChange}
      >
        <option value=""></option>

        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
