import React, { useEffect, useReducer, useRef } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateFilter,
    deleteTodo
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteSingleTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    }

    const onUpdateFilter = (filter: string) => {
        dispatch(updateFilter(filter))
    }

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
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={TodoStatus.COMPLETED === todo.status}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span>{todo.content}</span>
                                <button
                                    className="Todo__delete"
                                    onClick={() => onDeleteSingleTodo(todo.id)}
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
                        checked={todos.every(todo => todo.status === TodoStatus.COMPLETED)}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => onUpdateFilter('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={() => onUpdateFilter(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => {
                        onUpdateFilter(TodoStatus.COMPLETED)
                    }}>
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