import React, { ComponentPropsWithRef } from "react";
import Styles from "./input.module.scss";

type InputProps = {
  testId: string;
  variant?: "primary" | "secondary";
  forwardedRef?: React.Ref<HTMLInputElement>;
} & ComponentPropsWithRef<"input">;

const Input = ({ testId, variant = "primary", type = "text", forwardedRef, ...props }: InputProps) => {
  return (
    <input
      input-variant={variant}
      className={Styles.Input}
      type={type}
      ref={forwardedRef}
      data-testid={testId}
      {...props}
    />
  );
};

export default Input;
