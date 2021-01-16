import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';
import { calcFontSize, FontSize } from '../../../utils/spacing.utils';

const TextNormal = (props:
  {
    children?: string,
    display?: 'inline' | 'inline-block' | 'block'
    fontSize?: FontSize
  }
) => {
  const { children, display, fontSize } = props;
  const style: React.CSSProperties = {
    margin: 0,
    fontWeight: 'bold',
    color: colorPalete.onSurface,
    fontSize: calcFontSize(fontSize),
    display,
  }
  return <p style={style}>
    {children}
  </p>
}

export default TextNormal;