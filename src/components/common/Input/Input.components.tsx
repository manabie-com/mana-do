import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        {...props}
        className={`${className} ${error ? 'Todo__input--error' : ''}`}
        ref={ref}
      />
    );
  }
);
Input.defaultProps = {
  error: false,
};
export default Input;
