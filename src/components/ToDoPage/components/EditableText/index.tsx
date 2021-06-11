import React, { useEffect, useRef } from 'react';

import styles from './index.module.scss';
import useClickOutside from '../../../../hooks/useClickOutside';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
}

const EditableText = ({ value, onSave }: EditableTextProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(inputRef, () => {
    if (inputRef.current) {
      onSave(inputRef.current.value);
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.EditableText}>
      <input ref={inputRef} type="text" defaultValue={value} />
    </div>
  );
};

export default EditableText;
