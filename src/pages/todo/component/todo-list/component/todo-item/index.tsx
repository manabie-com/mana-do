import React, { useState } from "react"
import { Todo } from "models/todo"
import { isTodoCompleted } from "utils"
import styles from "./TodoItem.module.css"

interface IProps {
  todo: Todo
  onDelete: (todoId: string) => void
  onMarkDone: (isDone: boolean, todoId: string) => void
  onUpdateTodo: (todoId: string, content: string) => void
}

const TodoItem = (props: IProps): JSX.Element => {
  let editTextFieldRef: HTMLInputElement | null
  const { todo, onDelete, onMarkDone, onUpdateTodo } = props
  const [editable, setEditable] = useState<boolean>(false)
  const [editValue, setEditValue] = useState<string>(todo.content)

  const onChangeContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editValue) {
      onUpdateTodo(todo.id, editValue)
      setEditValue("")
      setEditable(false)
    }
  }
  return (
    <div className={styles.todoItemContainer}>
      <label
        className={styles.checkBoxContainer}
        onDoubleClick={(e) => {
          setEditable(true)
          editTextFieldRef?.focus()
        }}
      >
        {editable ? (
          <input
            autoFocus
            onChange={(e) => {
              setEditValue(e.target.value)
            }}
            onKeyDown={onChangeContent}
            ref={(input) => {
              editTextFieldRef = input
            }}
            type={"text"}
            onBlur={() => {
              setEditable(false)
              setEditValue(todo.content)
            }}
            className={styles.editTextField}
            value={editValue}
          />
        ) : (
          <span className={styles.todoText}>
            {isTodoCompleted(todo) ? <s>{todo.content}</s> : todo.content}
          </span>
        )}
        <input
          id={todo.id}
          type="checkbox"
          checked={isTodoCompleted(todo)}
          onClick={(e) => {
            onMarkDone(!isTodoCompleted(todo), todo.id)
            e.stopPropagation()
          }}
          onChange={() => {}}
        />
        <span className={styles.checkmark} />
      </label>
      <button
        className={styles.removeBtn}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(todo.id)
        }}
      >
        ✕
      </button>
    </div>
  )
}
export default TodoItem
