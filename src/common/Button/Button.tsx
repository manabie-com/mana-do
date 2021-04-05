import "./Button.css";

import React from "react";

export type Props = {
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}

const Button = ({
  type,
  onClick,
  children
}: Props) => {
  return (
    <button className={type === "del" ? "btn__delete" : "btn__action"} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "primary"
}

export default React.memo(Button);
