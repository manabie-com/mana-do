import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';

const TextWarning = (props:
  { children?: string }
) => {
  const { children } = props;
  const style: React.CSSProperties = {
    fontWeight: 'bold',
    color: colorPalete.secondary,
  }
  return <p style={style}>
    <i>
      {children}
    </i>
  </p>
}

export default TextWarning;