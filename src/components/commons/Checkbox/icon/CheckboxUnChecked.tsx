import React, { forwardRef } from "react";

interface Props {}
const CheckboxUnChecked = forwardRef((props: Props, ref: any) => {
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
        fill="#1caba0"
        d="M26.667 28.444H5.334c-.978 0-1.778-.8-1.778-1.778V5.333c0-.978.8-1.778 1.778-1.778h21.333c.978 0 1.778.8 1.778 1.778v21.333c0 .978-.8 1.778-1.778 1.778zM28.444 0H3.555A3.566 3.566 0 00-.001 3.556v24.889c0 1.956 1.6 3.556 3.556 3.556h24.889c1.956 0 3.556-1.6 3.556-3.556V3.556C32 1.6 30.4 0 28.444 0z"
      ></path>
    </svg>
  );
});

export default CheckboxUnChecked;
