import React, { ComponentPropsWithRef } from "react";
import Styles from "./input.module.scss";

type InputProps = {
  variant?: "primary" | "secondary";
} & ComponentPropsWithRef<"input">;

const Input = ({ variant = "primary", type = "text", ...props }: InputProps) => {
  return <input input-variant={variant} className={Styles.Input} type={type} {...props} />;
};

export default Input;
