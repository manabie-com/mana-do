import React, { useState } from 'react'
import Service from '../service'
import { AppActions, createTodo } from '../store/actions'

interface IAddTodo {
  dispatch: (value: AppActions) => void
}

const AddTodo: React.FC<IAddTodo> = ({ dispatch }) => {
  const [todoContent, setTodoContent] = useState<string>('')
  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && todoContent) {
      const resp = await Service.createTodo(todoContent)
      dispatch(createTodo(resp))
      setTodoContent('')
    }
  }
  return (
    <div className='Todo__creation'>
      <input
        type='text'
        value={todoContent}
        onChange={(e) => setTodoContent(e.target.value)}
        maxLength={200}
        className='Todo__input'
        placeholder='What need to be done?'
        onKeyDown={onCreateTodo}
      />
    </div>
  )
}

export default AddTodo
