import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    updateTodo,
    filterTodo
} from './store/actions';
import Service from './service';
import { toast } from 'react-toastify';
// import {TodoStatus} from './models/todo';

// type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [idSelected, setIdSelected] = useState<any>(null);
    // const [error, setError] = useState<any>(false);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputRef.current.value.length > 0) {
                // setError(false);
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                // get laij list all khi tao xong
                dispatch(filterTodo('ALL'));
                toast.success('thành công rồi nhé !!!', { autoClose: 5000 })
            }
            else {
                // setError(true);
                toast.error('Bạn nhập thiếu rồi đấy nhập lại đi nhé !!!', { autoClose: 5000 })
            }
        }
    }

    const editNameTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: any) => {
        if (e.key === 'Enter') {
            dispatch(updateTodo(todoId, inputRef1.current.value));
            setIdSelected('');
        }
    }


    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onFilter = (statusFilter: string) => {
        dispatch(filterTodo(statusFilter));
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteSingle = (todoID: string) => {
        dispatch(deleteTodo(todoID));
    }

    // click out side input => cancel edit
    const useOutsideAlerter = (ref: any) => {
        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIdSelected('');
                }
            };
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    };

    const inputRef1 = useRef<any>(null);
    useOutsideAlerter(inputRef1);


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
                                <div className="input-list-item">
                                    <input
                                        type="checkbox"
                                        checked={todo.status === 'COMPLETED'}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />
                                    {idSelected === todo.id ?
                                        <input ref={inputRef1} autoFocus className="input-edit" type='text' defaultValue={todo.content} onKeyDown={(e) => editNameTodo(e, todo.id)}></input>
                                        : <div onClick={() => setIdSelected(todo.id)}>{todo.content}</div>}
                                </div>
                                <button
                                    className="Todo__delete"
                                    onClick={() => onDeleteSingle(todo.id)}
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
                        checked={todos.filter((item: any) => item.status !== 'COMPLETED').length === 0}
                        disabled={todos.filter((item: any) => item.status !== 'COMPLETED').length === 0}
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => onFilter('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={() => onFilter('ACTIVE')}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => onFilter('COMPLETED')}>
                        Completed
                    </button>
                </div>
                <button disabled={todos.length === 0} className={`Action__btn ${todos.length === 0 ? 'disabled' : ''}`} onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;