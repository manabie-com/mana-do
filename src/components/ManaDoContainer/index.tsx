import * as React from "react";
import styles from "./ManaDoContainer.module.css";

interface IManaDoContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ManaDoContainer: React.FunctionComponent<IManaDoContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${styles.ManaDo__Container} ${className || ""}`}>
      {children}
    </div>
  );
};

export default React.memo(ManaDoContainer);
