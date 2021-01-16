import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';
import { calcSpacing } from '../../../utils/spacing.utils';

const InputSingle = (props:
  { fullWidth?: boolean }
  & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { fullWidth, ...rest } = props;
  const style: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    boxSizing: 'border-box',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: calcSpacing(1),
    color: colorPalete.onSurface,
    backgroundColor: colorPalete.surface
  }
  return <input style={style} {...rest} />
}

export default InputSingle;