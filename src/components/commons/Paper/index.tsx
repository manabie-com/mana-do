import React, { forwardRef } from "react";
import cn from "classnames";
import "./style.css";

export type Elevation = 0 | 1 | 2 | 3 | 4;
interface PaperProps {
  elevation?: Elevation;
  className?: string;
  children?: React.ReactNode;
}

const defaultProps: PaperProps = {
  elevation: 1,
};

const Paper = forwardRef((props: PaperProps, ref: any) => {
  const { className, elevation, children, ...rest } = {
    ...defaultProps,
    ...props,
  };

  const classOfComponent = cn(
    "paper-custom",
    className,
    `paper-custom-elevation-${String(elevation)}`
  );

  return (
    <div className={classOfComponent} ref={ref} {...rest}>
      {children}
    </div>
  );
});

export default Paper;
