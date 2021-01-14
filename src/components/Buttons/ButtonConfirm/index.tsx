import React from 'react';

const ButtonConfirm = (props:
  { children: string, fullWidth?: boolean }
  & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, fullWidth, ...rest } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
  }
  return <button style={style} {...rest}>
    {children}
  </button>
}

export default ButtonConfirm;