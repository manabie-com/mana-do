import React from "react";
import clsx from "clsx";
import { Todo } from "../../models/todo";
import TodoItem from "../TodoItem";

import styles from './TodoList.module.css'

export interface ITodoList {
  className?: string,
  todoList: Todo[],
  onUpdateTodoStatus: Function,
  onDeleteTodo: Function,
  onUpdateTodoContent: Function
}

const TodoList = (props: ITodoList) => {
  const { 
    className, 
    todoList, 
    onUpdateTodoStatus, 
    onDeleteTodo,
    onUpdateTodoContent
  } = props
  return (
    <div className={clsx(styles.root, className && className)}>
      {
        todoList && todoList?.length > 0 &&
        todoList.map(todo => {
          return (
            <TodoItem 
              key={todo.id}
              todo={{...todo}} 
              onUpdateTodostatus={onUpdateTodoStatus}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodoContent={onUpdateTodoContent}
            />
          )
        })
      }
    </div>
  )
}

export default React.memo(TodoList)