import React, { ReactElement } from 'react';

const Box = (props: { children: ReactElement, fullWidth?: boolean }) => {
  const { children, fullWidth } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
  }
  return <div style={style}>
    {children}
  </div>
}

export default Box;