import React, { ReactElement } from 'react';

const FullHeight = (props: { children: ReactElement, fullWidth?: boolean }) => {
  const { children, fullWidth } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    height: "100vh",
  }
  return <div style={style}>
    {children}
  </div>
}

export default FullHeight;