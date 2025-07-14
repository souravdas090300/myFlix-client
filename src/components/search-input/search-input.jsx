import React from "react";
import Form from "react-bootstrap/Form";

export const SearchInput = ({ value, onChange, placeholder, className, size }) => {
  return (
    <Form.Control
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      size={size}
    />
  );
};
