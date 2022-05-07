import React, { useRef } from 'react';
import { Todo, TodoStatus } from '../../models';
import { formatDate, isTodoCompleted } from '../../utils';
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

    // Prevent edit completed todo 
    const onHandleDoubleClick = () => {
        if (todo.status !== TodoStatus.COMPLETED) {
            onHandleEditTodo(todo.id);
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
        return (<span className={'Todo__content'+ (isTodoCompleted(todo) ? ' completed': '')} onDoubleClick={onHandleDoubleClick}>{todo.content}</span>);
    }

    return (
        <div className="ToDo__item">
            {
            // at checkbox, pass index to onUpdateTodoStatus is not guaranteed, 
            // should use todoId. Also it cause bug crashing application when click checkbox
            }
            <input
                id={todo.id}
                type="checkbox"
                className="toggle"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <label className='checkbox-custom' htmlFor={todo.id}></label>
            { renderMiddleTodoItem() }
            <div className="options-area">
                <span className='Todo__created-date'>{formatDate(todo.created_date)}</span>
                <button className='Todo__delete btn-icon' onClick={() => onDeleteTodo(todo.id)}>
                    <i className="eva eva-trash-2-outline"></i>
                </button>
            </div>
        </div>
    )
}

export default ToDoItem;