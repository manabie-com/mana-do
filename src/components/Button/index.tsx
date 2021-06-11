import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPrimary?: boolean;
  block?: boolean;
  pressed?: boolean;
}

const Button = ({ isPrimary, block, pressed, children, ...props }: React.PropsWithChildren<ButtonProps>) => {
  const className = classNames(
    styles.Button,
    isPrimary ? styles.Primary : styles.Default,
    block && styles.FullWidth,
    pressed && styles.Pressed
  );
  return (
    <div>
      <button className={className} {...props}>
        <span>{children}</span>
      </button>
    </div>
  );
};

export default Button;
