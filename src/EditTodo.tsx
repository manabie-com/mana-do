import React, { useRef, useState} from 'react';
import {Todo} from './models/todo';

export interface IEditTodoProps {
  todo: Todo;
  onEditTodo: (todo: Todo, content: string) => void;
}

export const EditTodo = ({todo, onEditTodo}: IEditTodoProps) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(todo.content)

  const onEdit = () => {
    setEdit(true)
  }
  
  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content) {
      onEditTodo(todo, content);
      setEdit(false)
    }
  }

  const onBlur = () => {
    onEditTodo(todo, content);
    setEdit(false)
  }

  return (
    <>
      {
        edit ? (
          <input
            ref={inputRef}
            className="Todo__input"
            placeholder="What need to be done?"
            value={content}
            autoFocus
            onChange={onChangeTodo}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />) : (
            <span onClick={onEdit}>{todo.content}</span>
          )
      }

    </>
    
  )
}