import React, { memo } from 'react'

import styles from './todo-input.module.css'

interface TodoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const TodoInput = ({ className, ...rest }: TodoInputProps): JSX.Element => (
  <input className={`${styles.input} ${className !== undefined ? className : ''}`} {...rest} />
)

export default memo(TodoInput)
