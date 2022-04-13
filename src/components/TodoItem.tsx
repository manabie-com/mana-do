import React, { useState, useRef } from 'react'

import {
    updateTodo,
    deleteTodo,
    AppActions
} from '../store/actions';
import { Todo, TodoStatus } from '../models/todo';

interface TodoItemProps {
    todo: Todo,
    dispatch: React.Dispatch<AppActions>
}

function TodoItem({ todo, dispatch }: TodoItemProps) {
    const [isEdit, setIsEdit] = useState(false);
    const updateInputRef = useRef<any>(null);

    const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const { value } = updateInputRef.current
            if (value?.trim()?.length) {
                dispatch(updateTodo({ ...todo, content: value }));
                updateInputRef.current.blur()
            }
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTodo({ ...todo, status: e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }));
    }

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId))
    }

    return (
        <div className="ToDo__item">
            <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={onUpdateTodoStatus}
            />
            {!isEdit ? <span onClick={() => setIsEdit(!isEdit)}>{todo.content}</span> : <input
                ref={updateInputRef}
                className="Todo__input"
                type="text"
                defaultValue={todo.content}
                onBlur={() => setIsEdit(!isEdit)}
                onKeyDown={onUpdateTodo}
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
