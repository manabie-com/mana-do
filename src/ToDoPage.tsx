import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from './store/reducer';
import {
    createTodo,
    deleteAllTodos,
    deleteTodo,
    editTodo,
    setTodos,
    toggleAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';
import ToDoItem from "./components/ToDoItem";
import ToDoTools from "./components/ToDoTools";

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const loadDataFromLocal = () => {
        setLoading(true)
        const raw = localStorage.getItem('my-todo')
        try {
            const data = JSON.parse(raw as any);
            if (data && data.length) {
                dispatch(setTodos(data));
                setLoading(false)
            }
        } catch (e) {

        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        setLoading(true)
        const index2 = todos.findIndex((todo) => todo.id === todoId);
        let tmp = todos;
        tmp[index2].status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        localStorage.setItem('my-todo', JSON.stringify(tmp))
        dispatch(updateTodoStatus(tmp as Todo[]))
        setLoading(false)
    }

    useEffect(() => {
        loadDataFromLocal()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
            setLoading(true)
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                const newTodos = [resp, ...todos];
                dispatch(createTodo(newTodos));
                localStorage.setItem('my-todo', JSON.stringify(newTodos))

                inputRef.current.value = '';
                setLoading(false)
            } catch (e) {
                setLoading(false)
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onEditTodo = async (value: string, todoItem: Todo) => {
        setLoading(true)
        try {
            const newTodos = todos.map((todo) => {
                if (todo.id === todoItem.id) {
                    todo['content'] = value
                }
                return todo
            });
            dispatch(editTodo(newTodos));
            localStorage.setItem('my-todo', JSON.stringify(newTodos))
            setLoading(false)
        } catch (e) {
            setLoading(false)
            if (e.response.status === 401) {
                history.push('/')
            }
        }
    }
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const tempTodos = todos.map((task: Todo) => {
            return ({
                ...task,
                status: e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            } as Todo)
        })
        localStorage.setItem('my-todo', JSON.stringify(tempTodos))
        dispatch(toggleAllTodos(tempTodos as Todo[]))
        setLoading(false)
    }

    const onDeleteAllTodo = () => {
        setLoading(true)
        localStorage.setItem('my-todo', '[]')
        dispatch(deleteAllTodos());
        setLoading(false)
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
    const onDeleteTodo = (id: string) => {
        setLoading(true)
        const newTodos = todos.filter((todoItem) => todoItem.id !== id) as Todo[]
        localStorage.setItem('my-todo', JSON.stringify(newTodos))
        dispatch(deleteTodo(newTodos))
        setLoading(false)
    }
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
                    {loading ? 'loading...' :
                        <div className="ToDo__list">
                            <ToDoTools
                                showing={showing}
                                setShowing={setShowing}
                                onDeleteAllTodo={onDeleteAllTodo}/>
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
                                showTodos.map((todo, index) =>
                                    <ToDoItem todo={todo}
                                              onEditTodo={onEditTodo}
                                              onDeleteTodo={onDeleteTodo}
                                              onUpdateTodoStatus={onUpdateTodoStatus}
                                              key={index}/>)
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ToDoPage;