import React from "react";
import "./BlockShadow.scss";

export const BlockShadow: React.FC<IBlockShadow> = ({
  children,
  className,
  paddingBottom,
  marginBottom,
}) => {
  return (
    <div
      className={`block-shadow ${className}`}
      style={{ paddingBottom, marginBottom }}
    >
      {children}
    </div>
  );
};
