import React, { useState } from 'react';
import { TodoStatus, Todo } from '../../models/todo';
import "../todo-item/todo-item.style.css"
export interface ITodoItemProps {
  onUpdateTodo(e: any, id: string): void;
  onDeleteTodo( id: string): void;
  onUpdateTodoStatus(e: any, id: string): void;
  index: number;
  todo: Todo;
}

export const TodoItem = (props: ITodoItemProps) => {

  const [content, setContent] = useState(props.todo.content)
  const [toggle, setToggle] = useState(true)
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }
  const onCancel = (e: any) => {
    setContent(props.todo.content)
    setToggle(true)
    e.preventDefault()
    e.stopPropagation()
  }
  const onUpdateTodo = (e: any) => {
    if (e.key === 'Enter') {
      props.onUpdateTodo(e, props.todo.id)
      setToggle(true)
    } else if (e.key === 'Escape') {
      onCancel(e)
    }
  }



  return (
    <div className="ToDo__item"
    >

      <div className={`ToDo__checkbox ${props.todo.status === TodoStatus.COMPLETED ? 'ToDo__item--completed' : ''}`} >
        <input
          id={`checkbox-${props.todo.id}`}
          type="checkbox"
          checked={props.todo.status === TodoStatus.COMPLETED}
          onChange={(e) => props.onUpdateTodoStatus(e, props.todo.id)}
        />
        <label htmlFor={`checkbox-${props.todo.id}`}></label>
      </div>

      {toggle ? (
        <p
          className='ToDo__content'
          onDoubleClick={() => {
            setToggle(false)
          }}
        >{content}</p>
      ) : (
        <input
          className='ToDo__item_input'
          type="text"
          value={content}
          onChange={(e) => handleChangeInput(e)}
          onBlur={(e) => onCancel(e)}
          onKeyDown={(e) => onUpdateTodo(e)}
          autoFocus
        />
      )}
      <button
        type="button"
        className="ToDo__delete"
        onClick={() =>  props.onDeleteTodo(props.todo.id) }>
        &#x2715;
      </button>
    </div>
  )
}


