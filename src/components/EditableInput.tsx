import React, {useState, useEffect, useRef} from 'react'

interface EditableInputProps {
  value: string;
  editable: boolean;
  onSave: (value: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({
  value,
  editable,
  onSave,
  ...other
}) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (inputRef && inputRef.current && isEditing === true) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const dismissKeys = ["Escape"];
    const saveKeys = ["Enter"];

    if (saveKeys.includes(key)) {
      save();
    }

    if (dismissKeys.includes(key)) {
      dismiss();
    }
  }

  const dismiss = () => {
    setText(value);
    setEditing(false);
  }

  const save = () => {
    if (text.trim()) {
      onSave(text.trim());
      setEditing(false);
    }
  }

  return (
    <>
      {(editable && isEditing) ? (
        <input
          {...other}
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => dismiss()}
          onKeyDown={e => handleKeyDown(e)}
        />
      ) : (
        <span {...other} onDoubleClick={() => setEditing(true)}>{value}</span>
      )}
    </>
  )
}

export default EditableInput;
