import React, { ReactElement } from 'react';
import { LayoutSpacing } from '../../../constants/layouts.constants';
import { calcSpacing } from '../../../utils/spacing.utils';

const Box = (props: {
  children: ReactElement | ReactElement[],
  fullWidth?: boolean,
  m?: LayoutSpacing,
  p?: LayoutSpacing,
}) => {
  const { children, fullWidth, m, p } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    margin: calcSpacing(m),
    padding: calcSpacing(p),
  }
  return <div style={style}>
    {children}
  </div>
}

export default Box;