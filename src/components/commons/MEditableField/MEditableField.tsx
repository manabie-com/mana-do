import React, {useRef, useState} from 'react';
import { useRefClickOutside } from '../../../utils/hooks';

interface MEditableFieldProps {
  id?: string,
  name?: string,
  type?: string,
  style?: {},
  className?: string,
  placeholder?: string,
  alwaysEditMode?: boolean,
  value: string,
  actionOnChange: (newValue : string) => void
}

const MEditableField = ({
  id,
  name,
  type = 'text',
  style,
  className,
  placeholder,
  alwaysEditMode = false,
  value,
  actionOnChange
} : MEditableFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setEditState] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  useRefClickOutside(inputRef, () => {
    setEditState(false);
    setTempValue(value);
  });

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (alwaysEditMode) {
      actionOnChange(e.target.value);
    }
    setTempValue(e.target.value);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (alwaysEditMode) return;
    switch (e.key) {
      case 'Enter':
        if (inputRef.current) {
          actionOnChange(inputRef.current.value);
          setEditState(false);
        }
        break;
      case 'Escape':
        setEditState(false);
        setTempValue(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className='m-editable-field'>
      {
        isEditing || alwaysEditMode
          ? <input
              id={id}
              type={type}
              name={name}
              style={style}
              ref={inputRef}
              value={tempValue}
              autoFocus={true}
              className={`m-editable-field__input ${className || ''}`}
              placeholder={placeholder}
              onChange={onValueChange}
              onKeyDown={onKeyDown}
            />
          : <span onDoubleClick={() => setEditState(true)}>{value}</span>
      }
    </div>
  )
}

export default MEditableField;
