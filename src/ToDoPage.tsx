import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    const loadDataFromLocal = () => {
        const raw = localStorage.getItem('my-todo')
        try {
            const data = JSON.parse(raw as any);
            if (data && data.length) {
                dispatch(setTodos(data));
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        loadDataFromLocal()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                const newTodos = [resp, ...todos];
                dispatch(createTodo(newTodos));
                localStorage.setItem('my-todo', JSON.stringify(newTodos))

                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        const index2 = todos.findIndex((todo) => todo.id === todoId);
        let tmp = todos;
        tmp[index2].status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        localStorage.setItem('my-todo', JSON.stringify(tmp))
        dispatch(updateTodoStatus(tmp as Todo[]))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempTodos = todos.map((task: Todo) => {
            return ({
                ...task,
                status: e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            } as Todo)
        })
        localStorage.setItem('my-todo', JSON.stringify(tempTodos))
        dispatch(toggleAllTodos(tempTodos as Todo[]))
    }

    const onDeleteAllTodo = () => {
        localStorage.setItem('my-todo', '[]')
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
        <div className="todoPage">
            <div className="container">
                <div className="login-title">
                    Task management
                </div>
                <div className="ToDo__container">
                    <div className="Todo__creation input-item">
                        <input
                            ref={inputRef}
                            className="Todo__input"
                            placeholder="What need to be done?"
                            onKeyDown={onCreateTodo}
                        />
                    </div>
                    <div className="ToDo__list">
                        <div className="Todo__toolbar">

                            <div className="status-filter">
                                Status filter
                            </div>
                            <div className="Todo__tabs">
                                <button className={`btn btn-primary ${
                                    showing === 'ALL' ?
                                        'active' : ''
                                }`}
                                        onClick={() => setShowing('ALL')}>
                                    All
                                </button>
                                <button className={`btn btn-primary ${
                                    showing === TodoStatus.ACTIVE ?
                                        'active' : ''
                                }`}
                                        onClick={() => setShowing(TodoStatus.ACTIVE)}>
                                    Active
                                </button>
                                <button className={`btn btn-primary ${
                                    showing === TodoStatus.COMPLETED ?
                                        'active' : ''
                                }`}
                                        onClick={() => setShowing(TodoStatus.COMPLETED)}>
                                    Completed
                                </button>
                            </div>
                            <button className="btn btn-primary" onClick={onDeleteAllTodo}>
                                Clear all
                            </button>
                        </div>
                        <div className="task-list">
                            Task List
                        </div>
                        <div className="ToDo__item header">
                            {todos.length > 0 ?
                                <input
                                    type="checkbox"
                                    checked={activeTodos === 0}
                                    onChange={onToggleAllTodo}
                                /> : <div/>
                            }
                            <span>Task name</span>
                            <div>
                                Action
                            </div>
                        </div>
                        {
                            showTodos.map((todo, index) => {
                                return (
                                    <div key={index} className="ToDo__item">
                                        <input
                                            type="checkbox"
                                            checked={isTodoCompleted(todo)}
                                            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                        />
                                        <span>{todo.content}</span>
                                        <button
                                            className="Todo__delete"
                                            onClick={() => {
                                                const newTodos = todos.filter((todoItem) => todoItem.id !== todo.id) as Todo[]
                                                localStorage.setItem('my-todo', JSON.stringify(newTodos))
                                                dispatch(deleteTodo(newTodos))
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoPage;