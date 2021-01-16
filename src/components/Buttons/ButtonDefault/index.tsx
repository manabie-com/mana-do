import React from 'react';
import { calcSpacing } from '../../../utils/spacing.utils';

export interface ButtonDefaultProps {
  children: string | string[],
  fullWidth?: boolean,
  style?: React.CSSProperties
}

const ButtonDefault = (props: ButtonDefaultProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, fullWidth, style, ...rest } = props;
  const btnStyle: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    fontSize: '0.9rem',
    padding: calcSpacing(1),
    border: '3px solid',
    borderRadius: '5px',
    fontWeight: 'bold',
    ...style,
  }
  return <button style={btnStyle} {...rest}>
    {children}
  </button>
}

export default ButtonDefault;