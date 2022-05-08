import React, { useRef, useState } from 'react';
import { Todo } from 'models';
import { formatDate, isTodoCompleted } from 'utils';
import './ToDoItem.css';

export interface ToDoItemProps {
    todo: Todo,
    onUpdateTodoStatus(e: any, todoId: string): void,
    onDeleteTodo(todoId: string): void,
    onEnterEditTodo(todoId: string, newContent: string): void
}

function ToDoItem({todo, onUpdateTodoStatus, onDeleteTodo, onEnterEditTodo}: ToDoItemProps)  {
    const editInputRef = useRef<HTMLInputElement>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onHandleKeyDown = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isEdit && editInputRef.current?.value) {
            onEnterEditTodo(todo.id, editInputRef.current.value.trim());
            setIsEdit(false);            
        }
    }

    const onHandleDoubleClick = () => {
        setIsEdit(true);
    }

    const renderMiddleTodoItem = () => {
        if (isEdit) {
            return (
                <input 
                    data-testid="todo-edit"
                    ref={editInputRef}
                    className="ToDo__edit-input"
                    type="text"
                    autoFocus
                    defaultValue={todo.content}
                    onBlur={() => setIsEdit(false)}
                    onKeyDown={onHandleKeyDown}
                />
            );
        } 
        return (
            <span data-testid={"todo-content-"+todo.id}
                className={'Todo__content'+ (isTodoCompleted(todo) ? ' completed': '')} 
                onDoubleClick={onHandleDoubleClick}
                >
                {todo.content}
            </span>
        );
    }

    return (
        <div className="ToDo__item" data-testid="todo-item">
            {
            // at checkbox, pass index to onUpdateTodoStatus is not guaranteed, 
            // should use todoId. Also it cause bug crashing application when click checkbox
            }
            <input
                id={todo.id}
                data-testid={"todo-checkbox-"+todo.id}
                type="checkbox"
                className="toggle"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            <label data-testid={"represent-checkbox-"+todo.id} className='checkbox-custom' htmlFor={todo.id}></label>
            { renderMiddleTodoItem() }
            <div className="options-area">
                <span data-testid={"todo-created-date-"+todo.id} className='Todo__created-date'>{formatDate(todo.created_date)}</span>
                <button data-testid={"todo-delete-btn-"+todo.id} className='Todo__delete btn-icon' onClick={() => onDeleteTodo(todo.id)}>
                    <i className="eva eva-trash-2-outline"></i>
                </button>
            </div>
        </div>
    )
}

export default ToDoItem;