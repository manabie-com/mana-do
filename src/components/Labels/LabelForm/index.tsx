import React from 'react';
import { colorPalete } from '../../../utils/colors.utils';

const LabelForm = (props: { htmlFor: string, label: string }) => {
  const style: React.CSSProperties = {
    margin: 0,
    fontWeight: 'bold',
    color: colorPalete.onSurface,
  }
  return <label
    style={style}
    htmlFor={props.htmlFor}
  >
    {props.label}
  </label>
}

export default LabelForm;