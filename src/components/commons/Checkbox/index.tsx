import React, { forwardRef, useRef } from "react";
import cn from "classnames";
import CheckboxChecked from "./icon/CheckboxChecked";
import CheckboxUnChecked from "./icon/CheckboxUnChecked";
import Input from "../Input";
import "./style.css";

interface Props {
  className?: string;
  iconRef?: React.Ref<unknown>;
  disabled?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultProps: Props = {
  disabled: false,
  checked: false,
};

const Checkbox = forwardRef((props: Props, ref: any) => {
  const {
    className,
    iconRef,
    name,
    disabled,
    checked,
    value,
    children,
    onChange,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  const classOfRoot = cn(
    "checkbox-custom",
    className,
    disabled && "checkbox-custom-disabled",
    checked && "checkbox-custom-checked"
  );

  const refOfInput = useRef();

  return (
    <label
      data-testid="checkbox-custom"
      className={classOfRoot}
      ref={ref}
      {...rest}
    >
      {checked ? (
        <CheckboxChecked ref={iconRef} />
      ) : (
        <CheckboxUnChecked ref={iconRef} />
      )}

      {children}
      <Input
        readOnly
        type="checkbox"
        ref={refOfInput}
        name={name}
        value={value}
        className="checkbox-custom-input"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
});

export default Checkbox;
