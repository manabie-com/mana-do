import React, { memo } from 'react'

import './Checkbox.css'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<IProps> = ({ disabled, checked, onChange }) => {
  return (
    <input
      type='checkbox'
      checked={checked}
      disabled={disabled}
      className='my-checkbox'
      onChange={onChange}
    />
  )
}

export default memo(Checkbox)
