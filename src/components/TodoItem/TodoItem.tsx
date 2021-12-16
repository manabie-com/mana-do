import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import Input from "../Input";

import styles from './TodoItem.module.css'

export interface ITodoItem {
  className?: string,
  todo: Todo,
  onDeleteTodo: Function,
  onUpdateTodostatus: Function,
  onUpdateTodoContent: Function
}

const TodoItem = (props: ITodoItem) => {
  const {
    className,
    todo,
    onUpdateTodostatus,
    onDeleteTodo,
    onUpdateTodoContent
  } = props
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    onUpdateTodostatus(todoId, e.target.checked)
  }

  const handleDeleteTodo = async (todoId: string) => {
    onDeleteTodo(todoId)
  }

  const onDoubleClick = () => {
    setIsEdit(true)
  }

  const onBlur = () => {
    setIsEdit(false)
  }

  const onUpdate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      onUpdateTodoContent({
        todoId: todo.id,
        content: inputRef.current.value
      })
      setIsEdit(false)
    }
  }

  useEffect(() => {
    if (isEdit) {
      if (inputRef.current) {
        inputRef.current.value = todo.content
        inputRef.current.focus()
      }
    }
  }, [isEdit, todo.content])

  return (
    <div className={clsx(styles.root, className && className)}>
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={(e) => handleUpdateTodoStatus(e, todo.id)}
      />
      <p onDoubleClick={onDoubleClick} >
        {
          isEdit ?
            <Input
              onBlur={onBlur}
              ref={inputRef}
              className="Todo__input"
              placeholder="What need to be done?"
              onKeyDown={onUpdate}
            />
            :
            todo.content
        }
      </p>
      <button
        className={styles.todoDelete}
        onClick={() => handleDeleteTodo(todo.id)}
      >
        X
      </button>
    </div>
  )
}

export default TodoItem