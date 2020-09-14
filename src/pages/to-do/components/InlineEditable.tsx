import React, { useState, useEffect, useRef } from "react";
import "./inline-editable.css";

interface InlineEditableProps {
  onSaveKeys?: [string];
  content: string;
  children: any;
  onSave: any;
}

const InlineEditable = (props: InlineEditableProps) => {
  const [isEditing, setEditing] = useState(false);
  const { children, content, onSave, onSaveKeys = ["Enter"] } = props;
  const [value, setValue] = useState(content);
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elRef && elRef.current && isEditing === true) {
      elRef.current.focus();
    }
  }, [isEditing, elRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const child = React.cloneElement(children, {
    className: "InlineEditable__child",
    ref: elRef,
    value,
    onChange: handleChange,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onSaveKeys.includes(e.key)) {
      if (value !== content) onSave(value);
      setEditing(false);
    }
  };

  const handleBlur = () => {
    setValue(content);
    setEditing(false);
  };

  return (
    <>
      {!isEditing && (
        <div
          className="InlineEditable__wrapper_view"
          onDoubleClick={() => setEditing(true)}
        >
          <span className="InlineEditable__view">{value}</span>
        </div>
      )}
      {isEditing && (
        <div
          className="InlineEditable__wrapper__edit"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          {child}
        </div>
      )}
    </>
  );
};

export default InlineEditable;
