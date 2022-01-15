import React from "react"
import clsx from "clsx"

import styles from "./TodoItem.module.scss"

import { Todo } from "models/todo";
import { isTodoCompleted } from "utils";

import Checkbox from "components/Checkbox";

export interface ITodoItemProps extends Todo {
  className?: string,
  onDeleteTodo: Function
  onUpdateTodoStatus: Function
}

const TodoItem = (props: ITodoItemProps) => {
  const { 
    className,
    onUpdateTodoStatus, onDeleteTodo,
    id, content, status
  } = props;

  const handleUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onUpdateTodoStatus(id, e.target.checked)
  }

  const handleDeleteTodo = (): void => {
    onDeleteTodo(id);
  } 

  return (
    <div className={clsx(styles.root, className && className)} data-test="todo-item">
      <Checkbox 
        checked={isTodoCompleted(status)} 
        onChange={handleUpdateTodoStatus} 
      />
      <span 
        className={clsx(styles.content, isTodoCompleted(status) && styles.active)}
        data-test="content"
      >
        {content}
      </span>
      <div 
        onClick={handleDeleteTodo} 
        className={styles.deleteButton} 
        data-test="delete-button"
      >
        X
      </div>
    </div>
  )
}

export default TodoItem