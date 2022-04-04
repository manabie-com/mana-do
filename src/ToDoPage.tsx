import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteTodo,
    deleteAllTodos,
    updateTodoStatus,
    handleUpdateTodoItem
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';
import "./ToDoPage.css"
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [idEditting, setIsEditting] = useState("");
    const [textUpdate, setTextUpdate] = useState("");
    const [toDosList, setToDosList] = useState<any>([])
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])
    useEffect(() => {
        window.localStorage.setItem("todos", JSON.stringify(todos));
        setToDosList(todos)
    }, [todos]);
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current.value !== "") {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = "";
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
    }
    const handleUpdateTodo = (item: any) => {
        setIsEditting(item.id);
        setTextUpdate(item.content)
        // dispatch(handleUpdateTodoItem(todoId))
    }
    const onEditTodo = () => {
        dispatch(handleUpdateTodoItem(idEditting, textUpdate))
        setIsEditting("")
    }
    const handleDeleteTodo = (idTodo: any) => {
        dispatch(deleteTodo(idTodo))
    }
    const handleFilter = (status: any) => {
        let arrTemp: any = [];
        status === "" ? arrTemp = todos : arrTemp = todos.filter(item => {
            return item.status === status
        })
        setToDosList(arrTemp)
    }
    return (
        <div className="ToDo__container">
            <h2 className='ToDo_Header'>To Do List</h2>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {toDosList.length === 0 ? "LIST EMPTY!!!" :
                    toDosList.map((todo: any, index: any) => {
                        return (
                            <div key={index}>
                                {idEditting !== todo.id ?
                                    <div className={'ToDo__item ' +
                                        `${todo.status === "COMPLETED" ? "ToDo__item__completed" : ""}`
                                    }
                                    >
                                        <input
                                            type="checkbox"
                                            checked={"COMPLETED" === todo.status}
                                            onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                        />
                                        {/* findex right id and update status */}
                                        <span onDoubleClick={() => {
                                            handleUpdateTodo(todo)
                                        }}>{todo.content}</span>
                                        <button
                                            onClick={() => handleDeleteTodo(todo.id)}
                                            className="Todo__delete"
                                        >
                                            X
                                        </button>
                                    </div>
                                    :
                                    <div className="ToDo__item">
                                        <input
                                            ref={input => input && input.focus()}
                                            className="input__edit"
                                            value={textUpdate}
                                            onChange={(e) => setTextUpdate(e.target.value)}
                                            onBlur={()=>{
                                                setIsEditting("")
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && todo.content) {
                                                    onEditTodo()
                                                }
                                            }}
                                        />
                                    </div>
                                }
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
                    <button className="Action__btn"
                        onClick={() => handleFilter("")}
                    >
                        All
                    </button>
                    <button className="Action__btn"
                        // onClick={() => setShowing(TodoStatus.ACTIVE)}
                        onClick={() => {
                            handleFilter("ACTIVE");
                        }}
                    >
                        Active
                    </button>
                    <button className="Action__btn"
                        //  onClick={() => setShowing(TodoStatus.COMPLETED)}
                        onClick={() => {
                            handleFilter("COMPLETED");
                        }}
                    >
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