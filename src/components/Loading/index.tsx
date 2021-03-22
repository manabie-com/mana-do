import * as React from "react";
import styles from "./Loading.module.css";

export interface LoadingProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "danger" | "muted";
}

const Loading: React.FunctionComponent<LoadingProps> = ({
  label,
  size = "md",
  variant = "muted",
  className,
}) => {
  const indicatorSize = React.useMemo(() => {
    switch (size) {
      case "sm":
        return styles.small;

      case "md":
        return styles.medium;

      case "lg":
        return styles.large;

      case "xl":
        return styles.xlarge;

      default:
        return styles.medium;
    }
  }, [size]);

  const indicatorColor = React.useMemo(() => {
    switch (variant) {
      case "primary":
        return styles.primary;

      case "secondary":
        return styles.secondary;

      case "danger":
        return styles.danger;

      case "muted":
        return styles.muted;

      default:
        return styles.muted;
    }
  }, [variant]);

  return (
    <div
      className={`${styles.ManaDo__LoadingIndicator__Wrapper} ${
        className || ""
      }`}
    >
      <div className={`${styles.ManaDo__LoadingIndicator__Container}`}>
        <div
          className={`${styles.ManaDo__LoadingIndicator} ${indicatorSize} ${indicatorColor}`}
        />
        {label && (
          <span className={styles.ManaDo__LoadingIndicator__Label}>
            Loading
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(Loading);
