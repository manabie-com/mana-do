import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
    deleteTodo
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            console.log('resp', resp)
            dispatch(setTodos(resp || []));
        })()
    }, [])

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

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId));
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onEditTodo = (e: any, todoId: any) => {
        e.target.removeAttribute('readOnly')
    }

    const onEUpdateTodo = (e: any, todoId: any) => {
        e.target.setAttribute('readOnly', 'readOnly')
    }

    const onUpdatingTodo = (e: any, todoId: any) => {
        dispatch(updateTodoContent(todoId, e.target.value))
    }

    return (
        <div className="ToDo__container disable-select">
            <div className="Todo__creation bg-primary rounded p-5">
                <div className="w-100 text-align-left">
                    <div className="font-size-large font-weight-bold color-white">What need to be done?</div>
                    <div className="color-white my-3">Type here then enter!</div>
                    <div className="w-100 input-todo">
                        <input
                            ref={inputRef}
                            className="Todo__input"
                            onKeyDown={onCreateTodo}
                        />
                    </div>
                </div>
            </div>

            <div className="legend-bar">
                <div className="legend-bar-item todo-color-active"></div>
                <div className="legend-bar-item todo-color-complete"></div>
            </div>

            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        className="border-color-primary"
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className={("Action__btn color-white ") + (showing===TodoStatus.ALL?"active":"")} onClick={() => setShowing(TodoStatus.ALL)}>
                        All
                    </button>
                    <button className={("Action__btn color-white ") + (showing===TodoStatus.ACTIVE?"active":"")} onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={("Action__btn color-white ") + (showing===TodoStatus.COMPLETED?"active":"")} onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn color-white bg-warning" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        return (
                            (showing === todo.status || showing === "ALL") &&
                            <div key={index} className={("ToDo__item ") + (todo.status===TodoStatus.ACTIVE?"todo-color-active":"todo-color-complete")}>
                                <input
                                    type="checkbox"
                                    className="todo-checkbox"
                                    checked={todo.status === TodoStatus.COMPLETED}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <input className="w-100 color-white" type="text" onBlur={(e) => onEUpdateTodo(e, todo.id)} onChange={(e) => onUpdatingTodo(e, todo.id)} readOnly onDoubleClick={(e) => onEditTodo(e, todo.id)} value={todo.content} />
                                <button
                                    className="Todo__delete"
                                    onClick={(e) => onDeleteTodo(todo.id)}
                                >
                                    ✖
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ToDoPage;