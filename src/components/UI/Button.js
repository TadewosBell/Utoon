import React from "react";

const Button = (props) => {
  return (
    <button className={props.classes} type={props.type || "button"}>
      {props.children}
    </button>
  );
};

export default Button;
