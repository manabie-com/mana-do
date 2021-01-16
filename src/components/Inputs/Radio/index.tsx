import React from 'react';
import { calcSpacing } from '../../../utils/spacing.utils';

const Radio = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const style: React.CSSProperties = {
    width: calcSpacing(2),
    height: calcSpacing(2),
    margin: 0
  }
  return <input type="radio" style={style} {...props} />
}

export default Radio;