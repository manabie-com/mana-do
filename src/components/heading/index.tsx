import React from "react";
import { IHeadingProps } from "./IHeadingProps";
import "./heading.scss";

const Heading = ({ text }: IHeadingProps): JSX.Element => {
  return (
    <div className="heading">
      <h2 className="heading__text">{text}</h2>
    </div>
  );
};

export default Heading;
