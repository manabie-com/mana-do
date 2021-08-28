import React, {Ref, useRef} from "react";
import "./TextInput.scss";

interface TextInputProps {
  title?: string;
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | React.Dispatch<string>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

function TextInput(props: TextInputProps, ref: Ref<HTMLInputElement>) {
  const { title = "", name, onChange, onKeyDown } = props;

  return (
    <div className="input">
      {title ? <div className="input__title">{title}</div> : null}
      <input
        type="text"
        id="user_id"
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref = {ref}
      />
    </div>
  );
}

export default React.memo(React.forwardRef(TextInput));
