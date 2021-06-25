import React, { memo, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { TodoContext } from 'src/context/TodoContext'
import Service from 'src/service/index'
import { createTodo } from 'src/store/actions'
import Input from 'src/components/Input'

import './InputTodo.css'

const InputTodo: React.FC = () => {
  const { dispatch } = useContext(TodoContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value)
        dispatch(createTodo(resp))
        inputRef.current.value = ''
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/')
        }
      }
    }
  }
  return (
    <div className='Todo__creation'>
      <Input
        ref={inputRef}
        placeholder='What need to be done?'
        onKeyDown={onCreateTodo}
      />
    </div>
  )
}

export default memo(InputTodo)
