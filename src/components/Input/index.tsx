import React, { memo } from "react";

interface IInputProps {
  label: string;
  name: string;
  variant: "password" | "email" | "text";
  placeholder?: string;
  classNames?: string;
  valueExternal: string;
  style?: object;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<IInputProps> = ({
  label,
  name,
  variant = "text",
  placeholder,
  classNames,
  onChange,
  valueExternal,
  style,
}) => {
  const [valueInternal, setValueInternal] = React.useState(() => {
    return valueExternal;
  });
  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInternal(e.target.value);
    onChange && onChange(e);
  };
  return (
    <label htmlFor={name} className={classNames}>
      <span>{label}</span>
      <input
        type={variant}
        id={name}
        name={name}
        value={valueInternal}
        placeholder={placeholder}
        style={style}
        onChange={handleChangeInternal}
      />
    </label>
  );
};

export default memo(Input);
