import React, { memo } from "react";
import clsx from "clsx";

import styles from "./TodoList.module.scss";

import { Todo } from "models/todo";

import TodoItem from "./TodoItem";

export interface ITodoListProps {
  className?: string,
  items: Todo[],
  dispatch: Function,
}

const TodoList = (props: ITodoListProps) => {
  const { className, items, dispatch } = props;

  return (
    <div className={clsx(styles.root, className && className)} data-test="todo-list">
      {items.map(item =>
        <div className={styles.item} key={item.id}>
          <TodoItem 
            {...item} 
            dispatch={dispatch}
          />
        </div>
      )}
    </div>
  )
}

export default memo(TodoList)