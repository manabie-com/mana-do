import * as React from "react";
import styles from "./FormGroup.module.css";

interface IFormGroupProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  id: string;
  label: string;
  value: string;
  type: string;
  placeholder: string;
  feedbackLabel: string;
  required: boolean;
}

const FormGroup: React.FunctionComponent<IFormGroupProps> = ({
  name = "",
  id = "",
  label = "",
  value = "",
  type = "text",
  placeholder = "Place holder",
  feedbackLabel = "",
  required = false,
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {},
  ...props
}) => {
  return (
    <div className={`${styles.ManaDo__formGroup} ${props.className || ""}`}>
      <label className={styles.ManaDo__formGroupLabel} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.ManaDo__formGroupInput} ${
          feedbackLabel && styles.ManaDo__inputError
        }`}
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="on"
      />
      <span className={styles.ManaDo__formGroupFeedbackLabel}>
        {feedbackLabel}
      </span>
    </div>
  );
};

export default React.memo(FormGroup);
