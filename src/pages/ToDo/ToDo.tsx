import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '../../store/reducer';
import {
    getTodos,
    getSingleTodo,
    editTodo,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';

import './ToDo.scss'
import TodoItem from '../../components/TodoItem/TodoItem';
import Modal from '../../components/Modal/Modal';
import { extractLocalStorageItem } from '../../utils/extractLocalStorageItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDo = ({ history }: RouteComponentProps) => {
    const [{ todos, todo }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [showModal, setShowModal] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputEditRef = useRef<HTMLInputElement>(null);

    const todoLocalItem = extractLocalStorageItem('todo');
    const token = localStorage.getItem('token');

    useEffect(() => {
        (async () => {
            dispatch(getTodos());
            inputRef.current?.focus();
        })()
    }, [])

    useEffect(() => {
        if (showModal) inputEditRef.current?.focus()
    }, [showModal])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && token) {
            try {
                if (inputRef.current.value !== '') {
                    const resp = await Service.createTodo(inputRef.current.value);
                    dispatch(createTodo(resp));
                    inputRef.current.value = '';
                    inputRef.current.focus();
                }
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
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

    const onDeleteTodoItem = (id: string) => {
        dispatch(deleteTodo(id))
    }

    const onClickToEditTodoItem = (id: string) => {
        dispatch(getSingleTodo(id));
        setShowModal(true);
    }

    const onEditTodoItem = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.key === "Enter" && inputEditRef.current && todoLocalItem && token) {
            if (inputEditRef.current.value !== '') {
                dispatch(editTodo(id, inputEditRef.current.value))
                setShowModal(false);
            }
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
        <>
            <div className="ToDo__container">
                <div className="Todo__creation">
                    <input
                        ref={inputRef}
                        type="text"
                        className="Todo__input"
                        placeholder="What need to be done?"
                        onKeyDown={onCreateTodo}
                    />
                </div>
                <div className="Todo__toolbar">
                    <div className="Todo__tabs">
                        <button className="Action__btn blue" onClick={() => setShowing('ALL')}>
                            All
                        </button>
                        <button className="Action__btn indigo" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                            Active
                        </button>
                        <button className="Action__btn orange" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                            Completed
                        </button>
                    </div>
                    <button className="Action__btn red" onClick={onDeleteAllTodo}>
                        Clear all todos
                    </button>
                </div>
                <div className="ToDo__checkAll">
                    {
                        todos.length > 0 &&
                        <div>
                            <input
                                type="checkbox"
                                id="checkAll"
                                checked={activeTodos === 0}
                                onChange={onToggleAllTodo}
                            />
                            <label htmlFor="checkAll">All completed? </label>
                        </div>
                    }
                </div>
                <div className="ToDo__list" style={todos.length > 0 ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
                    {todos.length > 0 ?
                        showTodos.map((todo) =>
                            <TodoItem
                                key={todo.id}
                                content={todo.content}
                                status={todo.status}
                                checked={isTodoCompleted(todo)}
                                onDelete={() => onDeleteTodoItem(todo.id)}
                                onChangeCheckbox={(e) => onUpdateTodoStatus(e, todo.id)}
                                onEdit={() => onClickToEditTodoItem(todo.id)}
                            />) : <p>There are no todos now</p>
                    }
                </div>
            </div>
            {(showModal && todo.status === TodoStatus.ACTIVE) &&
                <Modal closeModal={() => setShowModal(false)}>
                    <div className="EditModal">
                        <p>Edit Todo Item</p>
                        <div>
                            <input
                                ref={inputEditRef}
                                type="text"
                                className="Todo__input"
                                defaultValue={todo.content}
                                onKeyDown={(e) => onEditTodoItem(e, todo.id)}
                            />
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
};

export default ToDo;