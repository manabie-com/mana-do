import React from 'react';
import { Todo } from '../../models';
import { isTodoCompleted } from '../../utils';
import './ToDoItem.css';

export interface ToDoItemProps {
    todo: Todo,
    onUpdateTodoStatus(e: any, todoId: string): void,
    onDeleteTodo(todoId: string): void
}

function ToDoItem({todo, onUpdateTodoStatus, onDeleteTodo}: ToDoItemProps)  {
    return (
        <div className="ToDo__item">
            {
            // at checkbox, pass index to onUpdateTodoStatus is not guaranteed, 
            // should use todoId. Also it cause bug crashing application when click checkbox
            }
            <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <span>{todo.content}</span>
            <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
            >
                X
            </button>
        </div>
    )
}

export default ToDoItem;