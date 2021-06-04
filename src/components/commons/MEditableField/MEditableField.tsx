import React, {useRef, useState} from 'react';
import { useRefClickOutside } from '../../../utils/hooks';

interface MEditableFieldProps {
  id?: string,
  name?: string,
  type?: string,
  style?: {},
  readOnly? :boolean,
  className?: string,
  placeholder?: string,
  alwaysEditMode?: boolean,
  value?: string,
  actionOnChange?: (newValue : string) => void
}

/**
 * Initially, this component shows as view mode, to show only the value.
 * You can change it into edit mode by double click on the value.
 * This component can always show in edit mode as well.
 * During the editing phase, you can press 'Enter' to finish the change,
 * or press 'Escape' / click outside to cancel the editing phase, value will be rollback
 *
 * @param id: id of the input element
 * @param name: aria name of the input element
 * @param type: type of input, since this is editable text field so currently it can only be text or password,
 *  maybe textarea also.
 * @param style: extra inline style of the input -> NOT RECOMMEND
 * @param readOnly: define if input should be readonly
 * @param className: input class names
 * @param placeholder: input placeholder
 * @param alwaysEditMode: whether this input should always show in form of input or can show in span (read mode)
 * @param value: value of the input
 * @param actionOnChange: action to fire when the input value is changed
 */
const MEditableField = ({
  id,
  name,
  type = 'text',
  style,
  readOnly = false,
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
    if (alwaysEditMode && actionOnChange) {
      actionOnChange(e.target.value);
    }
    setTempValue(e.target.value);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (alwaysEditMode) return;
    switch (e.key) {
      // In case press enter, complete the edit
      case 'Enter':
        if (inputRef.current && actionOnChange) {
          actionOnChange(inputRef.current.value);
          setEditState(false);
        }
        break;
      // In case press Escape, rollback the value and back to view mode
      case 'Escape':
        setEditState(false);
        setTempValue(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className='MEditableField'>
      {
        isEditing || alwaysEditMode
          ? <input
              id={id}
              type={type}
              name={name}
              style={style}
              ref={inputRef}
              value={tempValue}
              readOnly={readOnly}
              autoFocus={true}
              className={`MEditableField__Input ${className || ''}`}
              placeholder={placeholder}
              onChange={onValueChange}
              onKeyDown={onKeyDown}
            />
          : <p className='MEditableField__Placeholder' onDoubleClick={() => setEditState(true)} title={value}>
              {value}
            </p>
      }
    </div>
  )
}

export default MEditableField;
