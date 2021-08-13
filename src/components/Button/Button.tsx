import React from "react";

import "./Button.scss";

export const Button: React.FC<IButton> = ({
  children,
  type,
  className,
  onClick,
  isRed,
  isWhite,
}) => {
  const checkClassName = () => {
    let name = "btn";
    if (isRed) {
      name = name + " btn--red";
    }
    if (isWhite) {
      name = name + " btn--white";
    }
    return name;
  };

  return (
    <button
      className={`${checkClassName()} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
