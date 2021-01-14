import React from 'react';

const FormBasic = (props:
  { fullWidth?: boolean }
  & React.InputHTMLAttributes<HTMLFormElement>
) => {
  const { children, fullWidth, ...rest } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
  }
  return <form style={style} {...rest} >
    {children}
  </form>
}

export default FormBasic;