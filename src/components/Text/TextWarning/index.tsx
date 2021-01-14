import React from 'react';

const TextWarning = (props:
  { children?: string }
) => {
  const { children } = props;
  return <p>
    <i>
      {children}
    </i>
  </p>
}

export default TextWarning;