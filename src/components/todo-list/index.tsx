import React, { useMemo } from 'react'
import { Todo, TodoStatus } from '@/models/todo'
import { AppActions, deleteTodo, updateTodoStatus } from '@/store/actions'
import TodoItem from '@/components/todo-item'

import './style.scss'
import { EnhanceTodoStatus } from '@/pages/todo'

interface IProps {
  todos: Todo[]
  dispatch: React.Dispatch<AppActions>
  currentStatus: EnhanceTodoStatus
}

const TodoList: React.FC<IProps> = ({ todos, dispatch, currentStatus }) => {
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId))
  }

  /**
   * Get label empty for each status
   */
  const getEmptyLabel = useMemo(() => {
    let label
    switch (currentStatus) {
      case TodoStatus.ACTIVE:
        label = "Nothing need to do, let's relax"
        break
      case TodoStatus.COMPLETED:
        label = 'Nothing is completed'
        break
      default:
        label = 'Type something into the input and Enter'
        break
    }
    return label
  }, [currentStatus])

  /**
   * I have to filter todos to display depend to status showing
   * But need to be wrap inside useMemo to prevent re-calculate
   */
  const todoFiltered = useMemo(() => {
    if (currentStatus !== 'ALL') {
      return todos.filter((todo) => todo.status === currentStatus)
    }
    return todos
  }, [currentStatus, todos])

  return (
    <div className="todo-list">
      {todoFiltered.length > 0 ? (
        todoFiltered.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodoStatus={onUpdateTodoStatus}
              dispatch={dispatch}
            />
          )
        })
      ) : (
        <label className="todo-list__empty">{getEmptyLabel}</label>
      )}
    </div>
  )
}

export default TodoList
