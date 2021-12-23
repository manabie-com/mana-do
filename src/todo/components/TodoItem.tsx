
import React, { useContext } from 'react'
import { Todo } from '../../models/todo'
import { isTodoCompleted } from '../../utils'
import { TodoContext } from '../contexts/TodoContext'

interface props {
    todo: Todo
}


export const TodoItem = ({todo}: props) => {
    
    const {onUpdateTodoStatus, onDeleteTodo} = useContext(TodoContext)
    const updateStatus = (event:React.ChangeEvent<HTMLInputElement>) => {
        onUpdateTodoStatus(event.target.checked, todo.id)
      };
   
    return (
        <div className="ToDo__item" data-testid="todo-item">
            <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => updateStatus(e)}
            />
            <span data-testid="todo-item-content">{todo.content}</span>
            <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
            >
                X
            </button>
        </div>
    )
}

export default TodoItem
