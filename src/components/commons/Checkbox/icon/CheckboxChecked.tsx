import React, { forwardRef } from "react";

interface Props {}
const CheckboxChecked = forwardRef((props: Props, ref: any) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="icon_GG7Y icon_3JOC"
    >
      <path
        fill="#00acb9"
        d="M28.444 0H3.555A3.566 3.566 0 00-.001 3.556v24.889c0 1.956 1.6 3.556 3.556 3.556h24.889c1.956 0 3.556-1.6 3.556-3.556V3.556C32 1.6 30.4 0 28.444 0zM13.707 23.627a1.761 1.761 0 01-1.253.52 1.771 1.771 0 01-1.253-.52l-6.382-6.382a1.769 1.769 0 01-.384-1.931 1.785 1.785 0 01.959-.959 1.775 1.775 0 011.931.384l5.12 5.12L24.676 7.628a1.773 1.773 0 012.506 2.506L13.706 23.627z"
      ></path>
    </svg>
  );
});

export default CheckboxChecked;
