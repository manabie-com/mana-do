import { useRef } from "react";

import { CgEnter } from "react-icons/cg";
import { Input, InputContainer, InputEndAdornment } from "styles/Input.styles";

let timeout = null;

export default function CreateTodo(props) {
  const inputRef = useRef(null);
  const { handleCreate = () => { } } = props;
  const onKeyDownAction = (e) => {
    if (e.key === "Enter" && inputRef.current) {
      const value = inputRef.current.value;
      if (timeout) {
        clearTimeout(timeout); // NOTE: optimize when user typing
      }
      const cb = () => {
        inputRef.current.value = "";
      };
      timeout = setTimeout(() => {
        handleCreate(value, cb);
      }, 200);
    }
  };

  return (
    <InputContainer>
      <Input
        ref={inputRef}
        placeholder='What need to be done?'
        onKeyDown={onKeyDownAction}
      />
      <InputEndAdornment title="Click to add">
        <div onClick={() => {
          onKeyDownAction({ key: "Enter" });
        }}><CgEnter /></div>
      </InputEndAdornment>
    </InputContainer>
  );
}
