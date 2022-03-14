import React, { createRef, useCallback, useEffect, useReducer, useRef, useState } from 'react';

import reducer, { AppState, initialState, loadFromLocalStorage } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
} from './store/actions';
import Service from './service';
import { TodoStatus, TodoUpdateType } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const initStatePersist: AppState | undefined = loadFromLocalStorage('state')
const initState: AppState = initStatePersist ? initStatePersist : initialState

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    //create ref with init value is array and it will contain list ref of todo input
    // because this todosRef will uniqe in App
    const todosRef = useRef<Array<HTMLInputElement | null>>([]);
    useEffect(() => {
        todosRef.current = todosRef.current.slice(0, todos.length);
    }, [todos]);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])


    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value: string = inputRef.current.value
        // if value === '' not go to create new
        if (e.key === 'Enter' && value) {
            const resp = await Service.createTodo(value);
            dispatch(createTodo(resp));

            // reset input
            inputRef.current.value = ''
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        handleUpdateTodo(todoId, e.target.checked, TodoUpdateType.STATUS)
    }

    const onToggleAllTodo = (status: string) => {
        // if action is complete all => status = "Complete" else "active"
        switch (status) {
            case TodoStatus.ACTIVE:
                dispatch(toggleAllTodos(false))
                break;
            case TodoStatus.COMPLETED:
                dispatch(toggleAllTodos(true))
                break;
            default:
                break;

        }
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    // function to remove one item
    const handleRemoveTodo = (id: string) => {
        dispatch(deleteTodo(id))
    }

    const handleDoubleClickTodo = (id: string, index: number, e: any) => {
        handleUpdateTodo(id, true, TodoUpdateType.ISEDIT);
    }

    const handleBlurTodoItem = (id: string) => {
        handleUpdateTodo(id, false, TodoUpdateType.ISEDIT)

    }

    const handleChangeTodoItem = (id: string, e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const value: string | undefined = todosRef.current[index]?.value
        // if value === '' or e.key !== 'enter do nothing
        if (e.key !== 'Enter' || !value || value === todos[index].content) {
            return
        }

        // todosRef.current[index]?.blur();
        handleUpdateTodo(id, value, TodoUpdateType.CONTENT);


    }

    const handleUpdateTodo = (id: string, value: string | Boolean, typeUpdate: string) => {
        const todo = todos.find(x => x.id === id);

        if (!todo) {
            return
        }

        const newTodo = { ...todo }
        switch (typeUpdate) {
            case TodoUpdateType.CONTENT:
                newTodo.content = value;
                newTodo.isEdit = false; // after edit content => input is not focused
                break;
            case TodoUpdateType.ISEDIT:
                newTodo.isEdit = value;
                break;
            case TodoUpdateType.STATUS:
                newTodo.status = value ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
                break;
            default:
                break;
        }
        dispatch(updateTodoStatus(id, newTodo))

    }

    // after double click todo content => set todo.isEdit = true => todos will change 
    //=> ref on todo content input will re-assign
    const onAssignRef = (ref: HTMLInputElement | null, index: number) => {
        todosRef.current[index] = ref;
        const todo = todos[index]
        if (!todo || !todo.isEdit) {
            return
        }

        todosRef.current[index]?.focus()

    }

    return (
        <>
            <h1 className='App__title'>TODO APP</h1>
            <div className="ToDo__container">
                <div className="Todo__toolbar px-16">

                    <div className="Todo__tabs">
                        <span className={"Todo__tab " + (showing === "ALL" ? "Todo__tab--active" : "")} onClick={() => setShowing("ALL")}>
                            All
                        </span>
                        <span className={"Todo__tab " + (showing === TodoStatus.ACTIVE ? "Todo__tab--active" : "")} onClick={() => setShowing(TodoStatus.ACTIVE)}>
                            Active
                        </span>
                        <span className={"Todo__tab " + (showing === TodoStatus.COMPLETED ? "Todo__tab--active" : "")} onClick={() => setShowing(TodoStatus.COMPLETED)}>
                            Completed
                        </span>
                    </div>
                    <div className="Todo__actions">
                        {todos.length > 0 &&
                            <>
                                <button className="Action__btn Action__btn--primary" onClick={() => onToggleAllTodo(TodoStatus.COMPLETED)}>
                                    <i className="fa-solid fa-circle-check mr-4"></i>  COMPLETE ALL
                                </button>
                                <button className="Action__btn Action__btn--default ml-8" onClick={() => onToggleAllTodo(TodoStatus.ACTIVE)}>
                                    <i className="fa-solid fa-arrow-rotate-left mr-4"></i> ACTIVE ALL
                                </button>



                            </>

                        }
                        <button className="Action__btn Action__btn--clear-all ml-8" onClick={onDeleteAllTodo}>
                            <i className="fa-solid fa-trash-can mr-4"></i>   CLEAR ALL
                        </button>
                    </div>

                </div>
                <div className="Todo__creation px-16">
                    <input
                        ref={inputRef}
                        className="Todo__input"
                        placeholder="What need to be done?"
                        onKeyDown={onCreateTodo}
                    />
                </div>
                <div className="ToDo__list px-16">
                    {
                        todos.map((todo, index) => {
                            return (
                                (showing === 'ALL' || showing === todo.status) &&
                                <div key={index} className="ToDo__item">
                                    <input
                                        type="checkbox"
                                        checked={todo.status === TodoStatus.COMPLETED}
                                        //must pass to do id to function onUpdateTodoStatus despite of to do index
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />

                                    {todo.isEdit
                                        ? <input
                                            ref={el => onAssignRef(el, index)}
                                            className="Content__input"
                                            onBlur={() => handleBlurTodoItem(todo.id)}
                                            defaultValue={todo.content}
                                            onKeyDown={(e) => handleChangeTodoItem(todo.id, e, index)}
                                        />
                                        : <span
                                            className='w-100 cursor-alias'
                                            onDoubleClick={(e) => handleDoubleClickTodo(todo.id, index, e)}
                                            style={{ 'textDecoration': todo.status === TodoStatus.COMPLETED ? 'line-through' : 'unset' }}
                                        >
                                            {todo.content}
                                        </span>
                                    }

                                    <button
                                        className="Todo__delete"
                                        onClick={() => handleRemoveTodo(todo.id)}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </>

    );
};

export default ToDoPage;