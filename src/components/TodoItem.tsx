import React, { useState } from 'react'

import { Todo, TodoStatus } from '../models/todo';

interface TodoItemProps {
    todo: Todo,
    updateInputRef: any,
    onUpdateTodo: any,
    onUpdateTodoStatus: any,
    onDeleteTodo: any

}

function TodoItem({ todo, updateInputRef, onUpdateTodo, onUpdateTodoStatus, onDeleteTodo }: TodoItemProps) {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="ToDo__item">
            <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo)}
            />
            {!isEdit ? <span onClick={() => setIsEdit(!isEdit)}>{todo.content}</span> : <input
                ref={updateInputRef}
                className="Todo__input"
                type="text"
                defaultValue={todo.content}
                onBlur={() => setIsEdit(!isEdit)}
                onKeyDown={(e) => onUpdateTodo(e, todo)}
                autoFocus
            />}
            <button
                className="Todo__delete"
                onClick={() => onDeleteTodo(todo.id)}
            >
                X
            </button>
        </div>
    );
}

export default TodoItem;
