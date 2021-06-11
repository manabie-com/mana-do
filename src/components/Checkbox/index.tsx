import React, { useRef } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';
import Icon from '../Icon';

interface CheckboxProps {
  checked?: boolean;
  id?: string;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
}

const noop = () => {};

const stopPropagation = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  event.stopPropagation();
};

const Checkbox = ({ id, checked, label, onChange = () => {}, ...props }: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    if (inputRef.current) {
      onChange(!inputRef.current.checked);
    }
  };
  return (
    <div className={classNames(styles.Control, checked && styles.Checked)} onClick={handleInput}>
      <input
        {...props}
        id={id}
        type="checkbox"
        className={styles.Input}
        checked={checked}
        ref={inputRef}
        onClick={stopPropagation}
        onChange={noop}
      />
      <span className={styles.BackDrop} />
      <span className={styles.Icon}>
        <Icon name="checkMark" color="white" />
      </span>
    </div>
  );
};

export default Checkbox;
