import React, { useEffect, useRef, useState } from 'react';
import "./input.scss";

interface InputProps {
  label: string,
  id: string,
  name: string,
  type: string,
  value: string,
  onChangeValue?: (name: string, value: string) => void;
  onPressEnter?: (event: any) => void;
  onClickOutside?: () => void;
}

const Input = (props: InputProps) => {
  const { label, id, name, type, onChangeValue, value, onClickOutside } = props;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target) && onClickOutside) {
          onClickOutside();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref])
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useOutsideAlerter(inputRef);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const name = e.target.name;
    const inputValue = e.target.value;
    setInputValue(inputValue);
    if (onChangeValue) {
      onChangeValue(name, inputValue);
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && props.onPressEnter) {
      props.onPressEnter(event);
    }
  }

  return (
    <div className="input-wrapper">
      <input
        ref={inputRef}
        type={type}
        className="common-input"
        id={id}
        name={name}
        value={inputValue}
        placeholder={label}
        onChange={onChangeField}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Input;