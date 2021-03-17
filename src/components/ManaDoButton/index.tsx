import * as React from "react";
import styles from "./ManaDoButton.module.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button";
  label: string;
}

const ManaDoButton = ({
  type = "button",
  label = "",
  onClick = () => {},
  ...props
}: IProps) => {
  return (
    <button
      className={`${styles.ManaDo__button} ${props.className || ""}`}
      type={type}
    >
      {label}
    </button>
  );
};

export default React.memo(ManaDoButton);
