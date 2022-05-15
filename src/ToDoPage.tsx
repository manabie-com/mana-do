/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    deleteTodo,
    updateTodoStatus,
    setEditTodo,
    updateTodoContent
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';

const SHOW_ALL = 'ALL';

type EnhanceTodoStatus = TodoStatus | typeof SHOW_ALL;


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(SHOW_ALL);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {

        //Do not save the editable status of each todo
        const saveTodos = [...todos].map((item) => {
            const initTodo = { ...item };
            delete initTodo.isEdit;

            return initTodo
        });
        localStorage.setItem('todos', JSON.stringify(saveTodos));
    }, [JSON.stringify(todos)]);

    useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
            const editTodo = todos.find((e) => e.isEdit);
            if (editTodo && (event.target as Element).id !== editTodo.id) {
                onSetEditTodo(editTodo.id, false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    });

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
        setShowing(SHOW_ALL);
    }

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    }

    const onSetEditTodo = (todoId: string, isEdit: boolean) => {
        dispatch(setEditTodo(todoId, isEdit));
    }

    const onUpdateTodoContent = (todoId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(updateTodoContent(todoId, e.currentTarget.value));
        }
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
                            todo.status === showing || showing === SHOW_ALL ?
                                <div key={index} className="ToDo__item">
                                    <input
                                        type="checkbox"
                                        checked={TodoStatus.COMPLETED === todo.status}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />
                                    {/* set editable of double clicked todo for displaying input text */}
                                    {!todo.isEdit ?
                                        <div onDoubleClick={() => onSetEditTodo(todo.id, true)}>{todo.content}</div> :
                                        <input className="Todo__content" id={todo.id} onKeyDown={(e) => onUpdateTodoContent(todo.id, e)} defaultValue={todo.content} />}
                                    <button
                                        className="Todo__delete"
                                        onClick={() => onDeleteTodo(todo.id)}
                                    >
                                        X
                                    </button>
                                </div>
                                : null
                        )
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={todos.every(ele => ele.status === TodoStatus.COMPLETED)}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className={showing === SHOW_ALL ? "Action__btn" : ""}
                        onClick={() => setShowing(SHOW_ALL)}>
                        All
                    </button>
                    <button className={showing === TodoStatus.ACTIVE ? "Action__btn" : ""}
                        onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={showing === TodoStatus.COMPLETED ? "Action__btn" : ""}
                        onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;