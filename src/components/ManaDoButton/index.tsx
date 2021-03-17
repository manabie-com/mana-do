import * as React from "react";
import styles from "./ManaDoButton.module.css";

interface ManaDoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: "button" | "icon";
}

const ManaDoButton: React.FunctionComponent<ManaDoButtonProps> = ({
  type = "button",
  label = "",
  variant = "button",
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      className={`${
        variant === "button" ? styles.ManaDo__button : styles.ManaDo__buttonIcon
      } ${props.className || ""}`}
      type={type}
    >
      {props.children && props.children}
      {label}
    </button>
  );
};

export default React.memo(ManaDoButton);
