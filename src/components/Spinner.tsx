import React, { CSSProperties } from "react";

const Spinner: React.FC<{ style?: CSSProperties }> = ({ style = {} }) => {
  return (
    <div className="spinner__wrapper" style={style}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
