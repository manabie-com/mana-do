import React, { ReactElement } from 'react';

const Clickable = (props:
  { children: ReactElement, onClick: () => void }
  & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { onClick, children } = props;
  const style: React.CSSProperties = {
    cursor: 'pointer'
  }
  return <div onClick={onClick} style={style}>
    {children}
  </div>
}

export default Clickable;