
import React, { MutableRefObject, useEffect, useReducer, useRef, useState } from 'react';
import FlipMove from 'react-flip-move'

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    editTodoStatus,
    showAllTodos,
} from './store/actions';
import Service from './service';
import { TodoStatus, Todo } from './models/todo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    //State
    const [getList, setGetList] = useState<Todo[]>([]);
    const [status, setStatus] = useState<string>("ALL");
    //Ref
    const inputRef = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>;
    const inputItemRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    })

    useEffect(() => {
        inputRef.current.focus();
        let listlocalStorerage = window.localStorage.getItem('LocalSettings:todolist:format')
        if (listlocalStorerage !== null) {
            dispatch(showAllTodos(JSON.parse(listlocalStorerage)))
            setStatus("ALL")
        }
    }, [])

    useEffect(() => {
        switch (status) {
            case TodoStatus.ACTIVE:
                setStatus(TodoStatus.ACTIVE)
                let activeArr = todos.filter(v => v.status === TodoStatus.ACTIVE)
                setGetList(activeArr)
                break;
            case TodoStatus.COMPLETED:
                setStatus(TodoStatus.COMPLETED)
                let completedArr = todos.filter(v => v.status === TodoStatus.COMPLETED)
                setGetList(completedArr)
                break;
            default:
                setStatus("ALL")
                setGetList(todos)
        }
    }, [todos, status])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ""
            if (status === TodoStatus.ACTIVE || status === TodoStatus.COMPLETED) {
                setStatus("ALL");
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked));
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked));
    }

    const onDeleteAllTodo = () => {
        switch (status) {
            case TodoStatus.ACTIVE:
                setGetList([])
                break;
            case TodoStatus.COMPLETED:
                setGetList([])
                break;
            case 'ALL':
                dispatch(deleteAllTodos())
                window.localStorage.clear()
                break;
        }
    }

    const deleteTodos = (Id: string) => {
        dispatch(deleteTodo(Id));
    }

    const handleChangeValue = (e: any, id: string) => {
        let conditionValueEdit = false
        if (e.key === 'Enter') {
            conditionValueEdit = true
            dispatch(editTodoStatus(e.target.value, id, conditionValueEdit))
            inputRef.current.focus()
        }
    }

    const handleShowTodoActive = () => {
        setStatus(TodoStatus.ACTIVE)
        let activeArr = todos.filter(v => v.status === TodoStatus.ACTIVE)
        setGetList(activeArr)
    }
    const handleShowTodoComplete = () => {
        setStatus(TodoStatus.COMPLETED)
        let completedArr = todos.filter(v => v.status === TodoStatus.COMPLETED)
        setGetList(completedArr)
    }

    const handleShowAllTodo = () => {
        setStatus("ALL")
        setGetList(todos)
    }
    return (
        <div className="ToDo__container">
            <h4 className="ToDo__title">Todo-List</h4>
            <div className="Todo__creation">
                <input
                    data-testid="addtodo"
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                <FlipMove duration={300} easing="ease-in-out" >
                    {
                        getList && getList.map((todo) => {
                            return (
                                <div key={todo.id} className="ToDo__item">
                                    <input
                                        type="checkbox"
                                        checked={todo.status === TodoStatus.COMPLETED}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />
                                    <span>
                                        <input type="text"
                                            className='Todo_todos'
                                            ref={inputItemRef}
                                            defaultValue={todo.content}
                                            onKeyDown={(e) => handleChangeValue(e, todo.id)}
                                        />
                                    </span>
                                    <button
                                        className="Todo__delete"
                                        onClick={() => deleteTodos(todo.id)}
                                    >
                                        <i className="fa-solid fa-trash" >X</i>
                                    </button>
                                </div>
                            );
                        })
                    }
                </FlipMove>
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className={status === "ALL" ? "Action__btn-all--active" : "Action__btn-all"} onClick={handleShowAllTodo}>
                        All
                    </button>
                    <button className={status === TodoStatus.ACTIVE ? "Action__btn-active--active" : "Action__btn-active"} onClick={handleShowTodoActive}>
                        Active
                    </button>
                    <button className={status === TodoStatus.COMPLETED ? "Action__btn-complete--active" : "Action__btn-complete"} onClick={handleShowTodoComplete}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn-clear" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;
