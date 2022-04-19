import * as React from "react";
import "./Progress.scss";

interface ProgressProps {
  value: number;
}

const Progress = ({ value }: ProgressProps) => {
  return (
    <>
      <div className="loading-bar">
        <div className="loading-bar--progress" style={{ width: value + "%" }}>
          <span className="first"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="last"></span>
        </div>
      </div>
    </>
  );
};

export default Progress;
