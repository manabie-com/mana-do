import React from "react";

import "./BlankLayout.scss";

export const BlankLayout: React.FC = ({ children }) => {
  return (
    <div className="blank-layout">
      <div className="blank-layout__center">{children}</div>
    </div>
  );
};
