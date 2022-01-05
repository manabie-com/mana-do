import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState, persistTodos } from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editing, setEditing] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputEditRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
            persistTodos(todos);
        })()
    }, [todos]);

    useEffect(() => {
        if (editing) inputEditRef.current?.focus();
    }, [editing]);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Check whether input is empty, do not add todo
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    // Update todo by double click
    const onUpdateTodoContent = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter' && inputEditRef.current && inputEditRef.current.value) {
            dispatch(updateTodoContent(todoId, inputEditRef.current?.value || ''));
            setEditing(-1);
        }
    }

    const openEditForm = (index: number) => {
        setEditing(index);
        inputEditRef.current?.focus();
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {editing === index ? <input
                                    ref={inputEditRef}
                                    className="Todo__input"
                                    defaultValue={todo.content}
                                    onKeyDown={(e) => onUpdateTodoContent(e, todo.id)}
                                    onBlur={() => setEditing(-1)}
                                ></input> : <span onDoubleClick={() => openEditForm(index)}>{todo.content}</span>}
                                <button
                                    className="Todo__delete"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;