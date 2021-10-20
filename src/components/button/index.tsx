import React from "react";
import { IButtonProps } from "./IButtonProps";
import "./button.scss";

const Button = ({
  text,
  type,
  color = "green",
  ...rest
}: IButtonProps): JSX.Element => {
  return (
    <button className={`btn btn--${color}`} type={type} {...rest}>
      {text}
    </button>
  );
};

export default Button;
