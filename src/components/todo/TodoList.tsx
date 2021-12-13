import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../../models/todo';
import useOutsideClickHook from '../../hooks/OutsideClickHook';
import TodoItem from './TodoItem';
import './TodoList.css'
import { filterTodos } from '../../utils'

interface Props {
  todos: Todo[]
  isShowAll: boolean
  onEditTodo: (todo: Todo) => Promise<void>
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void
  onDeleteTodo: (todo: Todo) => void
}

const TodoList = ({ todos, isShowAll, onEditTodo, onUpdateTodoStatus, onDeleteTodo } : Props) => {
  const [editTodoItem, setEditTodoItem] = useState<Todo | null>(null);

  //Create editInputReference to use for determining if the user is clicking outside
  const editInputRef = useRef<HTMLInputElement>(null);
  const isCloseEdit = useOutsideClickHook(editInputRef)

  const { activeTodos, completedTodos } = filterTodos(todos)

  useEffect(() => {
    if (isCloseEdit) {
      setEditTodoItem(null)
    }
  }, [isCloseEdit])

  const getTodoItems = (todos: Todo[]) => {
    return (
      todos.map((todo, index) => {
        return (
          <TodoItem 
            key={index} 
            todo={todo} 
            editInputRef={editInputRef} 
            editTodoItem={editTodoItem}
            setEditTodoItem={setEditTodoItem}
            onEditTodo={onEditTodo}
            onUpdateTodoStatus={onUpdateTodoStatus}
            onDeleteTodo={onDeleteTodo}
          />
        );
      })
    )
  }

  return (
    <div className="ToDoList__container">
      <div className="ToDoList__header">
        <h2>Active Tasks</h2>
      </div>
      { activeTodos.length > 0 ? ( 
          getTodoItems(activeTodos)
        ) : (
          <div className="ToDoList__text">No Todo Tasks</div>
        )
      }
      { isShowAll && (
          <div className="ToDoList__header">
            <h2>Completed Tasks</h2>
          </div>
        )
      }
      { isShowAll && (
          completedTodos.length > 0 ? (
            getTodoItems(completedTodos)
          ) : (
            <div className="ToDoList__text">No Todo Tasks</div>
          )
      )}
    </div>
  )
}

export default TodoList