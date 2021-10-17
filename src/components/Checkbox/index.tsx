import React from 'react'

import './style.css'

interface ICheckbox {
  text: string;
  checked?: boolean;
  onChange?: (...parrams: any) => void;
  onDoubleClick?: () => void;
}

const Checkbox = ({ text, checked, onChange, onDoubleClick }: ICheckbox) => {
  return (
    <label className='label'>
      <input type='checkbox' checked={checked} onChange={onChange} />
      <span
        className={`${checked ? `content-checked` : ''}content`}
        onDoubleClick={onDoubleClick}
      >
        {text}
      </span>
    </label>
  );
};

export default Checkbox
