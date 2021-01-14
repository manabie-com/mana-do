import React, { ReactElement } from 'react';

const Center = (props: { children: ReactElement, fullWidth?: boolean }) => {
  const { children, fullWidth } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
  return <div style={style}>
    {children}
  </div>
}

export default Center;