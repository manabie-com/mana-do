import React, { ReactElement } from 'react';
import { LayoutSpacing } from '../../../constants/layouts.constants';
import { calcSpacing } from '../../../utils/spacing.utils';

const Row = (props: {
  children: ReactElement | ReactElement[],
  fullWidth?: boolean,
  m?: LayoutSpacing,
  p?: LayoutSpacing,
  justifyContent?: 'space-between' | 'flex-end' | 'flex-start'
  alignItems?: 'center' | 'flex-end' | 'flex-start'
}) => {
  const { children, fullWidth, m, p, justifyContent = 'space-between', alignItems = 'center' } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    display: 'flex',
    justifyContent: justifyContent,
    alignItems: alignItems,
    margin: calcSpacing(m),
    padding: calcSpacing(p),
  }
  return <div style={style}>
    {children}
  </div>
}

export default Row;