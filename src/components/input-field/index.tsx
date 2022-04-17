import React from 'react'
import clsx from 'clsx'

import './style.scss'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}
type Ref = HTMLInputElement

const InputField = React.forwardRef<Ref, IProps>(
  ({ className, ...rest }, ref) => {
    const inputClasses = clsx('input-field', className)
    return <input ref={ref} className={inputClasses} {...rest} />
  }
)

export default InputField
