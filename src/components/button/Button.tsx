import React, {
  ButtonHTMLAttributes,
  FC,
  memo,
  MouseEventHandler,
} from "react";
import "./styles.scss";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: FC<IButtonProps> = ({
  className,
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`btn-todo ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default memo(Button);
