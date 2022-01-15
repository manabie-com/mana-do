import React, { memo } from "react";
import clsx from "clsx";

import styles from "./Checkbox.module.scss";

export interface ICheckboxProps {
  className?: string,
  checked?: boolean,
  onChange?: Function
}

const Checkbox = (props: ICheckboxProps) => {
  const { className, checked, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e)
  }

  return (
    <label className={clsx(styles.root, className && className)} data-test="checkbox">
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        data-test="checkbox-input"
      />
      <span className={styles.checkMark}></span>
    </label>
  )
}

export default memo(Checkbox);