import React, { memo } from "react";

interface IButtonProps {
  text: string;
  type?: "submit" | "button" | "reset";
  style?: object;
  classNames?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  text,
  type,
  style,
  classNames,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`btn ${classNames}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
      aria-pressed="true"
    >
      {text}
    </button>
  );
};

export default memo(Button);
