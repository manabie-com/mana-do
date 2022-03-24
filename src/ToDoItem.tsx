import React, { useRef, useState } from 'react'
import {
  updateTodoStatus,
  deleteTodo,
  editTodo,
  filterTodo,
} from './store/actions'
import { AppActions } from './store/actions'
import { Todo } from './models/todo'
import {useOnClickOutside} from "./hooks"

interface ToDoItemProps {
  todo: Todo
  dispatch: React.Dispatch<AppActions>,
  filterName:string
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, dispatch,filterName }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const inputRef = useRef<any>(null)
  const itemTodo = useRef<any>(null)

  useOnClickOutside(itemTodo,setIsEdit);
  
  const isCompleted = () => todo.status === 'COMPLETED'

  const onUpdateTodoStatus = async(
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    await dispatch(updateTodoStatus(todoId, e.target.checked))
    dispatch(filterTodo(filterName))
  }

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId))
  }

  const onEditTodo = () => {
    setIsEdit(true)
  }

  const onUpdateTodoContent = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      dispatch(editTodo(todo.id, inputRef.current.value))

      setIsEdit(false)
      inputRef.current.value = ''
    }
  }

  return (
    <>
      {todo.filter && (
        <div
          ref={itemTodo}
          className={`ToDo__item ${isCompleted() && 'ToDo__item_completed'}`}
          onDoubleClick={onEditTodo}
        >
          <input
            type="checkbox"
            checked={isCompleted()}
            onChange={(e) => {
              onUpdateTodoStatus(e, todo.id)
            }}
          />
          <div className="column w-full top">
            {isEdit ? (
              <input
                ref={inputRef}
                autoFocus
                defaultValue={todo.content}
                className="Update_todo w-90"
                type="text"
                onKeyDown={onUpdateTodoContent}
              />
            ) : (
              <span
                className={`Todo_text_content ${
                  isCompleted() && 'text_completed'
                }`}
              >
                {todo.content}
              </span>
            )}
            <div className="row">
              <span className="Todo_data_created">
                {new Date(todo.created_date).toLocaleDateString('en-GB')}
              </span>
              <span>{todo.user_id}</span>
            </div>
          </div>
          <button
            className="Todo__delete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            delete
          </button>
        </div>
      )}
    </>
  )
}

export default ToDoItem
