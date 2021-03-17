import * as React from "react";
import styles from "./ManaDoContainer.module.css";

interface IProps {
  children: React.ReactNode;
  className: string;
}

const ManaDoContainer = ({ children, className }: IProps) => {
  return (
    <div className={`${styles.ManaDo__Container} ${className}`}>{children}</div>
  );
};

export default React.memo(ManaDoContainer);
