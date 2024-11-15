import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={() => props.onClick()}
      className={`${classes["button-action"]} ${props.className}`}
    >
      {props.title}
    </button>
  );
};

export default Button;
