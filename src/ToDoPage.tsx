import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    editTodo
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';
import { isTodoCompleted } from './utils';
import { TODOS } from './constants'

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        (async () => {
            initData()
        })()
    }, [])

    const initData = () => {
        const resp = JSON.parse(localStorage.getItem(TODOS) as string)
        dispatch(setTodos(resp || []));
    }

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                if (!inputRef.current.value) return
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';

            } catch (e) {
                throw e
            }
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

    const onEditTodo = (todo: Todo) => {
        const { id } = todo
        const selectEL = document.getElementById(id)

        if (!selectEL || isTodoCompleted(todo)) return

        selectEL.setAttribute('contentEditable', "true")
        selectEL.focus()

        selectEL.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter' && selectEL.innerText.trim() !== '') {
                dispatch(editTodo(id, selectEL.innerText))
                selectEL.removeAttribute('contentEditable')
            }
        })
        document.addEventListener('click', (e: MouseEvent) => {
            if (selectEL.getAttribute('contentEditable')) {
                const isClickInsideElement = selectEL.contains(e.target as Element);
                const resp = JSON.parse(localStorage.getItem(TODOS) as string)
                const oldResp = resp.find((item: { id: string; }) => item.id === id)
                if (!isClickInsideElement) {
                    selectEL.innerText = oldResp?.content
                    selectEL.removeAttribute('contentEditable')
                }
            }

        });
    }

    const onDeleteTodo = (id: string) => {
        const selectEL = document.getElementById(id)
        if (!selectEL) return
        if (!selectEL.getAttribute('contentEditable')) {
            dispatch(deleteTodo(id))
        }
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
                                <label><input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    className="check-box"
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                /><span></span>
                                </label>
                                <span
                                    className={`${isTodoCompleted(todo) ? 'compeleted' : ''}`}
                                    id={todo.id}
                                    onDoubleClick={() => onEditTodo(todo)}
                                    title={todo.content}
                                >
                                    {todo.content}
                                </span>
                                <button
                                    className="Todo__delete"
                                    onClick={() => onDeleteTodo(todo.id)}
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
                    <label><input
                        type="checkbox"
                        checked={activeTodos === 0}
                        className="check-box"
                        onChange={onToggleAllTodo}
                    /><span></span>
                    </label> : <div />
                }
                <div className="Todo__tabs">
                    <button
                        className={`Action__btn ${showing === 'ALL' ? 'activeBtnCss' : ''}`}
                        onClick={() => setShowing('ALL')}>
                        All
                    </button>
                    <button
                        className={`Action__btn ${showing === TodoStatus.ACTIVE ? 'activeBtnCss' : ''}`}
                        onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button
                        className={`Action__btn ${showing === TodoStatus.COMPLETED ? 'activeBtnCss' : ''}`}
                        onClick={() => setShowing(TodoStatus.COMPLETED)}>
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