interface IButton {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isRed?: boolean;
  isWhite?: boolean;
}
