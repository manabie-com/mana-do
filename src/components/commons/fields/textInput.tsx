import React, { useCallback } from 'react'

export type TextInputProps = {
  label: string,
  name: string,
  value: string,
  onUpdateField: Function,
  autoFocus?: boolean,
  disabled?: boolean,
  inputType?: string
}

const TextInput = (props: TextInputProps) => {

  const { label, name, value
    , onUpdateField, autoFocus = false
    , disabled = false, inputType = 'text'
  } = props

  const handleUpdateField = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    onUpdateField(name, e.target.value)
  }, [onUpdateField, name])

  return (
    <label key={`field-textinput-${name}`} data-testid={`field-textinput-${name}`} htmlFor={`field-textinput-input-${name}`}>
      <h2 data-testid={`field-textinput-label-${name}`}>{label}</h2>
      <input
        data-testid={`field-textinput-input-${name}`}
        id={`field-textinput-input-${name}`}
        name='userId'
        autoFocus={autoFocus}
        defaultValue={value}
        onChange={handleUpdateField}
        disabled={disabled}
        type={inputType}
      />
    </label>
  )
}

export default TextInput