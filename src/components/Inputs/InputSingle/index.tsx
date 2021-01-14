import React from 'react';

const InputSingle = (props:
  { fullWidth?: boolean }
  & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { fullWidth, ...rest } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    boxSizing: 'border-box'
  }
  return <input style={style} {...rest} />
}

export default InputSingle;