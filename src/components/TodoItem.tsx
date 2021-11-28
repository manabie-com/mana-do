import Service from '../service';
import { Todo } from '../models/todo';
import { isTodoCompleted } from '../utils';
import React, { useEffect, useRef, useState } from 'react';
import { AppActions, deleteTodo, updateTodoStatus } from '../store/actions';
import './TodoItem.css';

interface ITodoItem {
    todos: Todo[];
    todo: Todo;
    dispatch: React.Dispatch<AppActions>;
}

export default function TodoItem({ todos, todo, dispatch }: ITodoItem) {
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(todo.content);
    const wrapperRef = useRef<any>(null);

    useEffect(() => {
        function onClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsEdit(false);
            }
        }

        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [wrapperRef]);

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todos, todoId, e.target.checked));
    };
    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const onKeyDownContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            todo.content = content;
            Service.updateTodos(todos);
            setIsEdit(false);
        }
    };

    const onDoubleClickContent = () => {
        setIsEdit(true);
        setContent(todo.content);
    };

    return (
        <div className="ToDo__item">
            <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
            />
            {isEdit ? (
                <input
                    type="text"
                    ref={wrapperRef}
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDownContent}
                />
            ) : (
                <span onDoubleClick={onDoubleClickContent}>{todo.content}</span>
            )}
            <button className="Todo__delete" onClick={() => dispatch(deleteTodo(todos, todo.id))}>
                X
            </button>
        </div>
    );
}
