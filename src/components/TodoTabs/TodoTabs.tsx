import React from "react";
import clsx from "clsx";
import { TodoStatus } from "../../models/todo";
import Button from "../Button";

import styles from './TodoTabs.module.css'

type EnhanceTodoStatus = TodoStatus | 'ALL';

export interface ITodoTabs {
  className?: string,
  onChange: Function,
  value: EnhanceTodoStatus
}

const TodoTabs = (props: ITodoTabs) => {
  const { className, value, onChange } = props 

  const handleClick = (tab: EnhanceTodoStatus) => {
    onChange(tab)
  }

  return (
    <div className={clsx(styles.root, className && className)}>
      <Button className={clsx(value==="ALL" && styles.active)} onClick={() => handleClick('ALL')}>
        All
      </Button>
      <Button className={clsx(value===TodoStatus.ACTIVE && styles.active)} onClick={() => handleClick(TodoStatus.ACTIVE)}>
        Active
      </Button>
      <Button className={clsx(value===TodoStatus.COMPLETED && styles.active)} onClick={() => handleClick(TodoStatus.COMPLETED)}>
        Completed
      </Button>
    </div>
  )
}

export default React.memo(TodoTabs)