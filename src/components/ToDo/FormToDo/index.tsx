import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "components/commons";

interface Props {
  onCreateToDo: (value: string) => Promise<boolean>;
}

const FormToDo = (props: Props) => {
  const { onCreateToDo } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const _handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        await onCreateToDo(inputRef.current.value);
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };
  return (
    <div className="Todo__creation">
      <Input
        ref={inputRef}
        className="Todo__input"
        placeholder="What need to be done?"
        onKeyDown={_handleKeyDown}
      />
    </div>
  );
};

export default FormToDo;
