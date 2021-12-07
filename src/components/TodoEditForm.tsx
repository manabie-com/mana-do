import React, { useRef, useState } from 'react';
import { TodoEditFormInterface } from '../models/todo';
import useOutsideClick from './useOutsideClick'

const TodoEditForm = (props: TodoEditFormInterface) => {
  const wrapperRef = useRef(null)
  const [inputRef, setInputRef] = useState(props.todo?.content)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRef(e.target.value)
  }

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef) {
      props.onUpdateTodo({ ...props.todo, content: inputRef})
    }
  }

  useOutsideClick(wrapperRef, () => {
    props.onCancelUpdate()
  })

  return (
    <div ref={wrapperRef} data-testid="todo-edit-form">
      <input
        value={inputRef}
        className="Todo__input__edit"
        data-testid="input-todo-edit"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default TodoEditForm