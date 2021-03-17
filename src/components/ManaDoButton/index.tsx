import * as React from "react";
import styles from "./ManaDoButton.module.css";

interface ManaDoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ManaDoButton: React.FunctionComponent<ManaDoButtonProps> = ({
  type = "button",
  label = "",
  onClick = () => {},
  ...props
}) => {
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
