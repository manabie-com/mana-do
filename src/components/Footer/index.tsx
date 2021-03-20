import * as React from "react";
import styles from "./Footer.module.css";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "primary" | "secondary";
}

const Footer: React.FunctionComponent<FooterProps> = ({
  className,
  variant = "primary",
}) => {
  const footerColor = React.useMemo(() => {
    switch (variant) {
      case "primary":
        return styles.primary;

      case "secondary":
        return styles.secondary;

      default:
        return styles.primary;
    }
  }, [variant]);

  return (
    <div
      className={`${styles.ManaDo__Footer} ${footerColor} ${className || ""}`}
    >
      @2021 ManaDo Coding Challenge - By Phan Thong Thanh
    </div>
  );
};

export default Footer;
