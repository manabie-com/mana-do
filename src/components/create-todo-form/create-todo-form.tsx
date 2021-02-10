import React, { useState, useContext, memo } from 'react'

import { TodoContext } from '../../store/contexts/todo'
import { createTodo } from '../../store/actions/todo'

import Service from '../../service'

import TodoInput from '../todo-input'

import styles from './create-todo-form.module.css'

const CreateTodoForm = (): JSX.Element => {
  const [, dispatch] = useContext(TodoContext)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)

    if (e.target.value === '') return setError(true)

    setError(false)
  }

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (value.trim() === '') return setError(true)

    try {
      const resp = await Service.createTodo(value)

      dispatch(createTodo(resp))
      setValue('')
      setError(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form data-testid='create-form' onSubmit={handleFormSubmit}>
      <div className={styles.wrapper}>
        <TodoInput
          className={`${styles.input} ${error ? styles.error : ''}`}
          placeholder='What needs to be done?'
          value={value}
          onChange={handleInputChange}
          onBlur={() => setError(false)}
        />
      </div>
    </form>
  )
}

export default memo(CreateTodoForm)
