import React, { SVGProps } from "react";

const GarbageSVG: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h20v20H0z" />
      <g transform="translate(2 2)">
        <circle fill="#E95562" cx={8} cy={8} r={8} />
        <path
          d="M11.094 4.023l.883.883L8.883 8l3.094 3.094-.883.883L8 8.883l-3.094 3.094-.883-.883L7.117 8 4.023 4.906l.883-.883L8 7.117l3.094-3.094z"
          fill="#FFF"
        />
      </g>
    </g>
  </svg>
);

export default GarbageSVG;
