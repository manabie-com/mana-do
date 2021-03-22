import * as React from "react";

import styles from "./FormGroup.module.css";

export interface IFormGroupProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  name: string;
  type: string;
  value?: string;
  label?: string;
  placeholder?: string;
  feedbackLabel?: string;
  required?: boolean;
  defaultValue?: string;
  autoFocus?: boolean;
}

const FormGroup: React.FunctionComponent<IFormGroupProps> = ({
  id,
  name,
  type = "text",
  value,
  label,
  placeholder,
  feedbackLabel,
  required = false,
  defaultValue,
  autoFocus = false,
  className,
  onChange,
  ...props
}) => {
  return (
    <div className={`${styles.ManaDo__formGroup} ${className || ""}`}>
      {label && (
        <label className={styles.ManaDo__formGroupLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`${styles.ManaDo__formGroupInput} ${
          feedbackLabel && styles.ManaDo__inputError
        }`}
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        autoComplete="on"
        autoFocus={autoFocus}
      />
      <span className={styles.ManaDo__formGroupFeedbackLabel}>
        {feedbackLabel || <>&nbsp;</>}
      </span>
    </div>
  );
};

export default React.memo(FormGroup);
