import React, { useRef } from 'react';
import { Todo } from '../../models';
import { isTodoCompleted } from '../../utils';
import './ToDoItem.css';

export interface ToDoItemProps {
    todo: Todo,
    todoEditId: string,
    onUpdateTodoStatus(e: any, todoId: string): void,
    onDeleteTodo(todoId: string): void,
    onHandleEditTodo(todoId: string): void,
    onEnterEditTodo(todoId: string, newContent: string): void
}

function ToDoItem({todo, todoEditId, onUpdateTodoStatus, onDeleteTodo, onHandleEditTodo, onEnterEditTodo}: ToDoItemProps)  {
    const editInputRef = useRef<HTMLInputElement>(null);

    const onHandleKeyDown = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && todoEditId === todo.id && editInputRef.current?.value) {
            console.log(editInputRef.current.value.trim())
            onEnterEditTodo(todo.id, editInputRef.current.value.trim());
        }
    }

    const renderMiddleTodoItem = () => {
        if (todoEditId === todo.id) {
            return (
                <input 
                    ref={editInputRef}
                    className="ToDo__edit-input"
                    type="text"
                    autoFocus
                    defaultValue={todo.content}
                    onBlur={() => onHandleEditTodo('')}
                    onKeyDown={onHandleKeyDown}
                />
            );
        } 
        return (<span onDoubleClick={() => onHandleEditTodo(todo.id)}>{todo.content}</span>);
    }

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
            { renderMiddleTodoItem() }
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