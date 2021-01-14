import React from 'react';

const TextNormal = (props:
  {
    children?: string
  }
) => {
  const { children } = props;
  const style: React.CSSProperties = {
    margin: 0,
  }
  return <p style={style}>
    {children}
  </p>
}

export default TextNormal;