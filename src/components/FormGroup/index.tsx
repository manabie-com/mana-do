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
}

const FormGroup: React.FunctionComponent<IFormGroupProps> = ({
  name = "",
  id = "",
  label = "",
  type = "text",
  value,
  placeholder = "Place holder",
  feedbackLabel = "",
  defaultValue = "",
  required = false,
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {},
  ...props
}) => {
  return (
    <div className={`${styles.ManaDo__formGroup} ${props.className || ""}`}>
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
      />
      <span className={styles.ManaDo__formGroupFeedbackLabel}>
        {feedbackLabel}
      </span>
    </div>
  );
};

export default React.memo(FormGroup);
