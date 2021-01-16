import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';

const RulerHorizontal = (props:
  & React.InputHTMLAttributes<HTMLFormElement>
) => {
  const style: React.CSSProperties = {
    width: '100%',
    color: colorPalete.onSurface,
    margin: '1px',
  }
  return <hr style={style} />
}

export default RulerHorizontal;