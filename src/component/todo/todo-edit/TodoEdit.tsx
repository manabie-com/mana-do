import React, { useState } from 'react';

export interface AppProps {
  defaultValue: string,
  onCancel: () => void,
  onUpdate: (content: string) => void,
}

const TodoEdit = ({ defaultValue, onCancel, onUpdate }: AppProps) => {
  const [value, setValue] = useState(defaultValue);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isModify = value !== defaultValue;
    if (e.key === 'Enter') {
      if (isModify && value) {
        onUpdate(value);
      }
      onCancel();
      return;
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };
  return <input
    autoFocus
    defaultValue={defaultValue}
    onChange={(e) => setValue(e.target.value)}
    onKeyDown={onKeyDown}
    onBlur={onCancel}
  />
};

export default TodoEdit;