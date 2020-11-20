import React from 'react';
import { ITextField } from '../../models/textField';

const TextField = (props: ITextField) => {
  return (
    <label htmlFor={props.id}>
      <span className={props.className}>{props.label}</span>
      <input {...props} />
    </label>
  );
};
export default TextField;
