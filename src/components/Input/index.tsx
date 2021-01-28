import React from "react";

interface Props {
  id?: string;
  name: string;
  placeholder?: string;
  value: string;
  style?: any;
  type?: string;
  className?: string;
  onChange: (name: string, value: string) => void;
}

const Input: React.FC<Props> = (props) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(props.name, e.target.value);
  };

  return (
    <>
      <input
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        style={props.style}
        className={`template-input ${props.className}`}
        onChange={onChangeInput}
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
  className: "",
};

export default Input;
