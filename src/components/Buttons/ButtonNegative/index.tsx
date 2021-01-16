import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';
import ButtonDefault, { ButtonDefaultProps } from '../ButtonDefault';

const ButtonNegative = (props:
  ButtonDefaultProps
  & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, fullWidth, ...rest } = props;
  const style: React.CSSProperties = {
    color: colorPalete.onSurfaceSecondary,
    background: colorPalete.surface,
    borderColor: colorPalete.secondary
  }
  return <ButtonDefault style={style} {...rest}>
    {children}
  </ButtonDefault>
}

export default ButtonNegative;