import React, { FunctionComponent } from "react";

interface Props {
  label: string;
  onClick: () => void;
  styles?: React.CSSProperties;
  className?: string;
  [propName: string]: any;
}

const Button : FunctionComponent<Props> =({
  className,
  styles,
  label,
  onClick,
  ...rest
}) => {
  return (
    <div
      style={styles}
      className={className || ""}
      onClick={onClick}
      {...rest}
    >
      {label}
    </div>
  );
}

export default Button;
