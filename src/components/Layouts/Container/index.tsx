// https://material-ui.com/customization/breakpoints/
import React, { ReactElement } from 'react';
import { colorPalete } from '../../../utils/colors.utils';
import { BreakPointMaxWidth, calcBreakPoint } from '../../../utils/spacing.utils';

const Container = (props:
  {
    children?: ReactElement | ReactElement[]
    breakpoint: BreakPointMaxWidth
  }
) => {
  const { children, breakpoint } = props;

  const style: React.CSSProperties = {
    margin: '0 auto',
    fontWeight: 'bold',
    color: colorPalete.secondary,
    maxWidth: calcBreakPoint(breakpoint)
  }
  return <div style={style}>
    {children}
  </div>
}

export default Container;