import React, { Children, isValidElement } from 'react';

import styles from './index.module.scss';

interface ButtonGroupProps {}

export function elementChildren<T extends React.ReactElement>(children: React.ReactNode): T[] {
  return Children.toArray(children).filter((child) => isValidElement(child)) as T[];
}

const ButtonGroup = ({ children }: React.PropsWithChildren<ButtonGroupProps>) => {
  return (
    <div data-buttongroup="true" className={styles.ButtonGroup}>
      {elementChildren(children)}
    </div>
  );
};

export default ButtonGroup;
