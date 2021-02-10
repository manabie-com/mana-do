import React, { useState, useEffect, useContext, memo } from 'react'

import { TodoContext } from '../../store/contexts/todo'
import { setDisplayFilter, deleteTodos, toggleTodos } from '../../store/actions/todo'

import { Todo, TodoStatus, EnhancedTodoStatus } from '../../models/todo'

import { isTodoCompleted } from '../../utils'

import TodoInput from '../todo-input'

import styles from './todo-toolbar.module.css'

const countActiveTodos = (todos: Todo[]): number => todos.reduce((accum, todo) =>
  isTodoCompleted(todo.status) ? accum : accum + 1, 0)

const getTodoActionClassName = (displayFilter: EnhancedTodoStatus, status: EnhancedTodoStatus): string =>
  displayFilter === status ? `${styles.action} ${styles.active}` : styles.action

const TodoToolbar = (): JSX.Element => {
  const [{ todos, displayFilter }, dispatch] = useContext(TodoContext)
  const [activeTodoNumber, setActiveTodoNumber] = useState(countActiveTodos(todos))

  const handleFilterClick = (status: EnhancedTodoStatus): void => dispatch(setDisplayFilter(status))

  const handleClearButtonClick = (): void => dispatch(deleteTodos())

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    dispatch(toggleTodos(e.target.checked))

  useEffect(() => {
    setActiveTodoNumber(countActiveTodos(todos))
  }, [todos])

  return (
    <div className={styles.toolbar}>
      {todos.length > 0
        ? <TodoInput type='checkbox' checked={activeTodoNumber === 0} onChange={handleCheckboxChange} />
        : <div />}
      <div className={styles.tabs}>
        <button
          className={getTodoActionClassName(displayFilter, 'ALL')}
          onClick={() => handleFilterClick('ALL')}
        >
          All
        </button>
        <button
          className={getTodoActionClassName(displayFilter, TodoStatus.ACTIVE)}
          onClick={() => handleFilterClick(TodoStatus.ACTIVE)}
        >
          Active
        </button>
        <button
          className={getTodoActionClassName(displayFilter, TodoStatus.COMPLETED)}
          onClick={() => handleFilterClick(TodoStatus.COMPLETED)}
        >
          Completed
        </button>
      </div>
      <button className={styles.action} onClick={handleClearButtonClick}>
        Clear all todos
      </button>
    </div>
  )
}

export default memo(TodoToolbar)
