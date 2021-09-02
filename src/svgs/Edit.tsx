import React, { SVGProps } from "react";

const EditSVG: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3328 5.66667C12.3328 5.48257 12.4821 5.33333 12.6662 5.33333C12.8502 5.33333 12.9995 5.48257 12.9995 5.66667V10.3333C12.9995 11.2538 12.2533 12 11.3328 12H2.6569C1.73643 12 0.990234 11.2538 0.990234 10.3333V1.66667C0.990234 0.746192 1.73643 0 2.6569 0H7.33282C7.51691 0 7.66615 0.149238 7.66615 0.333333C7.66615 0.517428 7.51691 0.666667 7.33282 0.666667H2.6569C2.10462 0.666667 1.6569 1.11438 1.6569 1.66667V10.3333C1.6569 10.8856 2.10462 11.3333 2.6569 11.3333H11.3328C11.8851 11.3333 12.3328 10.8856 12.3328 10.3333V5.66667ZM11.5685 0.0976311L12.9019 1.43096C13.032 1.56114 13.032 1.77219 12.9019 1.90237L7.56852 7.2357C7.50601 7.29821 7.42123 7.33333 7.33282 7.33333H5.99949C5.81539 7.33333 5.66615 7.18409 5.66615 7V5.66667C5.66615 5.57826 5.70127 5.49348 5.76378 5.43096L11.0971 0.0976311C11.2273 -0.0325437 11.4383 -0.0325437 11.5685 0.0976311ZM6.33282 5.80474L11.3328 0.804738L12.1947 1.66667L7.19475 6.66667H6.33282V5.80474Z"
      fill="black"
    />
  </svg>
);

export default EditSVG;
