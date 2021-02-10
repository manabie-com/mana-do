import React, { useContext, memo } from 'react'

import { TodoContext } from '../../store/contexts/todo'
import { updateTodo, deleteTodo } from '../../store/actions/todo'

import TodoListItem from './todo-list-item'

import { Todo } from '../../models/todo'

import styles from './todo-list.module.css'

interface TodoListProps {
  todos: Todo[]
}

const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  const [, dispatch] = useContext(TodoContext)

  const handleUpdateTodo = (todo: Todo): void => dispatch(updateTodo(todo))

  const handleDeleteTodo = (id: string): void => dispatch(deleteTodo(id))

  return (
    <div className={styles.list}>
      {
        todos.map(todo => {
          return (
            <TodoListItem
              key={`todo-list-item_${todo.id}`}
              todo={todo}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          )
        })
      }
    </div>
  )
}

export default memo(TodoList)
