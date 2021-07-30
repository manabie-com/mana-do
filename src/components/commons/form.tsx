import React, { useCallback } from 'react'

export type FormProps = {
  model: any,
  formData: any,
  onSubmit: Function,
  onUpdateField: Function,
  submitText?: string
}

const Form = (props: FormProps) => {
  const { model, formData, onSubmit
    , onUpdateField, submitText
  } = props
  const fields = Object.keys(model).map((key) => {
    return model[key]
  })

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }, [onSubmit])

  const handleSubmitClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSubmit()
  }, [onSubmit])

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        const { component, ...nestedProps } = field
        return component({ ...nestedProps, ...formData[field.name], onUpdateField })
      })}
      <div className='actions'>
        <button type='submit' onClick={handleSubmitClick}>
          {submitText}
        </button>
      </div>
    </form>
  )
}

export default Form