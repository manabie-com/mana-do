import React, { useEffect, useState } from 'react'

import { createTodo, toggleAllTodos, deleteAllTodos, getTodos } from '../store/actions'
import { Todo, TodoStatus } from '../models/todo'
import useStore from '../hooks/useStore'
import TodoItem from './TodoItem'
import Spinner from './common/Spinner'
import usePrevious from '../hooks/usePrevious'
import { AppState } from '../types/AppState'
import TabButton from './common/TabButton'
import { EnhanceTodoStatus } from '../types/todo'
import { TODO_MAX_CONTENT_LENGTH } from '../config/constants'

const ToDoPage = () => {
  const [content, setContent] = useState('')
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')
  const [{ todos, isLoading, isCreating }, dispatch] = useStore(
    ({ todos, isLoading, isCreating }: AppState) => {
      return {
        isLoading,
        isCreating,
        todos: todos.filter((todo) => showing === 'ALL' || todo.status === showing),
      }
    }
  )
  const prevIsCreating = usePrevious(isCreating)

  useEffect(() => {
    dispatch(getTodos())
  }, [])

  useEffect(() => {
    if (prevIsCreating && !isCreating) {
      setContent('')
    }
  }, [isCreating])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.length) {
      dispatch(createTodo(content))
    }
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todoIds: string[] = todos.map((todo: Todo) => todo.id)
    dispatch(toggleAllTodos(todoIds, e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos())
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (content.length <= TODO_MAX_CONTENT_LENGTH) {
      setContent(e.target.value)
    }
  }

  const renderTodos = () => {
    if (isLoading) {
      return (
        <div className="ToDo__no-content">
          <Spinner text="Loading" />
        </div>
      )
    }

    if (!todos.length) {
      return (
        <div className="ToDo__no-content">
          <h2>Yay! You don't have a job today</h2>
        </div>
      )
    }

    return (
      <div className="ToDo__list">
        {todos.map((todo: Todo, index: number) => (
          <TodoItem key={todo.id + index} todo={todo} dispatch={dispatch} />
        ))}
      </div>
    )
  }

  const isToggleCheked = todos.every((todo: Todo) => todo.status === TodoStatus.COMPLETED)

  return (
    <div className="ToDo__container card">
      <div className="Todo__creation">
        <div className="Todo__input-container">
          <input
            className="Todo__input"
            placeholder="What need to be done?"
            value={content}
            onChange={onInputChange}
            onKeyDown={onCreateTodo}
            disabled={isCreating}
            minLength={2}
            maxLength={60}
          />
          {isCreating && <Spinner size={8} />}
        </div>
        <p className="Todo__hint">
          {content.length > 0 && (
            <span>The remaining characters: {TODO_MAX_CONTENT_LENGTH - content.length}</span>
          )}
        </p>
      </div>

      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            onChange={onToggleAllTodo}
            data-test-id="toggle-all-todo"
            checked={isToggleCheked}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <TabButton label="All" type={'ALL'} onButtonClick={setShowing} showing={showing} />
          <TabButton label="Active" type={'ACTIVE'} onButtonClick={setShowing} showing={showing} />
          <TabButton
            label="Completed"
            type={'COMPLETED'}
            onButtonClick={setShowing}
            showing={showing}
          />
        </div>
        <button data-test-id="delete-all-todos" className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>

      {renderTodos()}
    </div>
  )
}

export default ToDoPage
