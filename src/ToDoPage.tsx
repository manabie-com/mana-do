import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    onKeyDownDBAction
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL' | '';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('');
    const inputRef = useRef<any>(null);
    const inputDBRef = useRef<any>(null);
    const [val, setVal] = useState(String)
    const [checkDB, setCheckDB] = useState(String)

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const handleClickOutside = (event: Event) => {
        if (inputDBRef.current && !inputDBRef.current.contains(event.target)) {
            setCheckDB('')
        }
    };

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            setVal('')
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
        setShowing('')
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setVal(value)
    }

    const onDeleteToDo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, todoId: string) => {
        dispatch(deleteTodo(todoId))
    }
    const onKeyDownDB = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter') {
            const payload = {
                id: todoId,
                value: inputDBRef.current.value
            }
            dispatch(onKeyDownDBAction(payload))
            setCheckDB('')
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
                    onChange={onChange}
                    value={val}
                />
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        const { id } = todo
                        return (
                            <div key={index} className="ToDo__item" onDoubleClick={() => { setCheckDB(id) }}>
                                <input
                                    type="checkbox"
                                    checked={showing === "ALL" ? true : showing === todo.status}
                                    onChange={(e) => onUpdateTodoStatus(e, id)}
                                />
                                {checkDB === id ? <input ref={inputDBRef} className="Todo__input" defaultValue={todo.content} onKeyDown={(e) => onKeyDownDB(e, id)} /> : <span>{todo.content}</span>}
                                <button
                                    className="Todo__delete"
                                    onClick={(e) => onDeleteToDo(e, id)}
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
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => setShowing("ALL")}>
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