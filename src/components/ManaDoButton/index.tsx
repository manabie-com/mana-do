import * as React from "react";

import styles from "./ManaDoButton.module.css";
import Loading from "../Loading";

interface ManaDoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  btnType?: "button" | "icon";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "primary-light"
    | "secondary-light"
    | "danger-light"
    | "muted";
  isLoading?: boolean;
}

const ManaDoButton: React.FunctionComponent<ManaDoButtonProps> = ({
  type = "button",
  className,
  label,
  btnType = "button",
  variant = "muted",
  isLoading = false,
  children,
  ...props
}) => {
  const buttonColor = React.useMemo(() => {
    switch (variant) {
      case "primary":
        return isLoading
          ? styles.ManaDo__button__primaryLight
          : styles.ManaDo__button__primary;

      case "secondary":
        return isLoading
          ? styles.ManaDo__button__secondaryLight
          : styles.ManaDo__button__secondary;

      case "danger":
        return isLoading
          ? styles.ManaDo__button__dangerLight
          : styles.ManaDo__button__danger;

      case "primary-light":
        return styles.ManaDo__button__primaryLight;

      case "secondary-light":
        return styles.ManaDo__button__secondaryLight;

      case "danger-light":
        return styles.ManaDo__button__dangerLight;

      case "muted":
        return styles.ManaDo__button__muted;

      default:
        return styles.ManaDo__button__muted;
    }
  }, [isLoading, variant]);

  const buttonType = React.useMemo(() => {
    switch (btnType) {
      case "button":
        return styles.ManaDo__button;

      case "icon":
        return styles.ManaDo__button__Icon;

      default:
        return styles.ManaDo__button;
    }
  }, [btnType]);

  const loadingColor = React.useMemo(() => {
    switch (variant) {
      case "primary-light":
        return "primary";

      case "secondary-light":
        return "secondary";

      case "danger-light":
        return "danger";

      default:
        return "muted";
    }
  }, [variant]);

  return (
    <button
      className={`${buttonType} ${buttonColor} ${className || ""}`}
      type={type}
      {...props}
    >
      {isLoading ? (
        <Loading size="sm" variant={loadingColor} />
      ) : btnType === "icon" ? (
        <>
          {children || ""} {label || ""}
        </>
      ) : (
        label || ""
      )}
    </button>
  );
};

export default React.memo(ManaDoButton);
