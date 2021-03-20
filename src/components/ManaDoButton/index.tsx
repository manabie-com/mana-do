import * as React from "react";
import Loading from "../Loading";
import styles from "./ManaDoButton.module.css";

interface ManaDoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  btnType?: "button" | "icon";
  variant?:
    | "primary"
    | "secondary"
    | "primary-light"
    | "secondary-light"
    | "muted";
  isLoading?: boolean;
}

const ManaDoButton: React.FunctionComponent<ManaDoButtonProps> = ({
  type = "button",
  className = "",
  label = "",
  btnType = "button",
  variant = "muted",
  isLoading = false,
  ...props
}) => {
  const btnColor = React.useMemo(() => {
    switch (variant) {
      case "primary":
        return isLoading
          ? styles.ManaDo__button__primaryLight
          : styles.ManaDo__button__primary;

      case "secondary":
        return isLoading
          ? styles.ManaDo__button__secondaryLight
          : styles.ManaDo__button__secondary;

      case "primary-light":
        return styles.ManaDo__button__primaryLight;

      case "secondary-light":
        return styles.ManaDo__button__secondaryLight;

      case "muted":
        return styles.ManaDo__button__muted;

      default:
        return "";
    }
  }, [variant]);

  return (
    <button
      className={`${
        btnType === "button"
          ? styles.ManaDo__button
          : styles.ManaDo__button__Icon
      } ${btnColor} ${className || ""}`}
      type={type}
      {...props}
    >
      {isLoading ? (
        <Loading size="sm" />
      ) : (
        <>
          {props.children} {label}
        </>
      )}
    </button>
  );
};

export default React.memo(ManaDoButton);
