import React, { ReactElement } from 'react';

const DoubleClickable = (props:
  { children: ReactElement, onDoubleClick: () => void }
  & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { onDoubleClick, children } = props;
  const style: React.CSSProperties = {
    cursor: 'pointer'
  }

  return <div onClick={(event) => {
    if (event.detail === 2) {
      onDoubleClick();
    }
  }} style={style}>
    {children}
  </div>
}

export default DoubleClickable;