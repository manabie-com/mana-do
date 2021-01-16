import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';
import ButtonDefault, { ButtonDefaultProps } from '../ButtonDefault';

const ButtonNeutral = (props:
  ButtonDefaultProps
  & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, fullWidth, ...rest } = props;
  const style: React.CSSProperties = {
    color: colorPalete.onSurface,
    background: colorPalete.surface,
    borderColor: colorPalete.primary
  }
  return <ButtonDefault style={style} {...rest}>
    {children}
  </ButtonDefault>
}

export default ButtonNeutral;