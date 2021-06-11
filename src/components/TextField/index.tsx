import React from 'react';

import styles from './index.module.scss';
import DisplayText from '../DisplayText';

export interface TextFieldProps extends React.InputHTMLAttributes<any> {
  label?: string;
}

// eslint-disable-next-line react/display-name
const TextField = React.forwardRef(
  ({ label, type = 'text', ...props }: TextFieldProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className={styles.TextField}>
        {label && <DisplayText className={styles.Label}>{label}</DisplayText>}
        <input {...props} className={styles.Input} ref={ref} type={type} />
      </div>
    );
  }
);

export default TextField;
