import React from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ onKeyDown, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      onKeyDown={onKeyDown}
      {...rest}
    />)
});

export default Input;