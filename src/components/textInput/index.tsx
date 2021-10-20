import React from "react";
import { ITextInputProps } from "./ITextInputProps";
import "./textInput.scss";

const TextInput = ({ label, id, ...rest }: ITextInputProps): JSX.Element => {
  return (
    <div className="text-input">
      <label htmlFor={id} className="text-input__label">
        {label}
      </label>
      <input className="text-input__input" id={id} {...rest} />
    </div>
  );
};

export default TextInput;
