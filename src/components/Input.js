import React from "react";

export const InputComponent = ({ props }) => {
  return (
    <input
      autoFocus={true}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.handleChange(e.target.value)}
      name={props.name}
      className="todo__input"
    />
  );
};
