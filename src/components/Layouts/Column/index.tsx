import React, { ReactElement } from 'react';
import { LayoutSpacing } from '../../../constants/layouts.constants';
import { calcSpacing } from '../../../utils/spacing.utils';

const Column = (props: {
  children: ReactElement | ReactElement[],
  fullWidth?: boolean
  m?: LayoutSpacing,
  p?: LayoutSpacing,
  g?: LayoutSpacing
}) => {
  const { children, fullWidth, m, p, g } = props;
  const style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: fullWidth ? "100%" : "auto",
    margin: calcSpacing(m),
    padding: calcSpacing(p),
    rowGap: calcSpacing(g),
  }
  return <div style={style}>
    {children}
  </div>
}

export default Column;