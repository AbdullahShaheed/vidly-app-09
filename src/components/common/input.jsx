import React from "react";

const Input = ({
  name,
  label,
  value,
  type = "text",
  placeholder,
  error,
  onChange,
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
