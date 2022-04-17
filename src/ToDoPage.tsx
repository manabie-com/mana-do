import React, { useEffect, useReducer, useRef, useState} from 'react';

import reducer from './store/reducer';
import {
    createTodo,
    deleteAllTodos,
    deleteTodo,
    editTodo,
    toggleAllTodos,
    updateTodoStatus,
} from './store/actions';
import Service from './service';
import { TodoStatus} from './models/todo';
import {isTodoCompleted} from "./utils";

type EnhanceTodoStatus = TodoStatus | 'ALL';

//Add custom hook.
function useOutsideAlerter(ref: React.RefObject<any>,cbFunction: Function) {
    useEffect(() => {
        function handleClickOutside(e: MouseEvent | TouchEvent) {
            if(ref.current && !ref.current?.contains(e.target)) {
                cbFunction()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            //Unbind event listener
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, cbFunction])
}

const getInitialState = () => {
    const resp = localStorage.getItem("todos")
    return {todos: resp != null ? JSON.parse(resp) : []}
}

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, getInitialState());
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editRowId, setEditRowId] = useState<any>(null);
    const inputRef = useRef<any>(null);
    const editInputRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null)
    useOutsideAlerter(wrapperRef, () => setEditRowId(null));

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            if(inputRef.current.value) {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
            }
        }
    }

    const onEditTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter') {
            dispatch(editTodo(todoId, editInputRef.current.value))
            setEditRowId(null)
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        //ISSUE: Passing the index instead of todoId.
        //SOLUTION: Passing the correct todoId.
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteSingleTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId))
    }

    const onDoubleClickItem = (todoId: any) => {
        setEditRowId(todoId)
    }

    return (
        <div className="ToDo__container" ref={wrapperRef}>
            <div className="Todo__creation">
                <input
                    aria-label="addTodo"
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        if(showing === 'ALL' || showing === todo.status){
                            // React recommends not using index for keys.
                            return (
                                <div data-testid={`todoItem${index}`} key={todo.id} className="ToDo__item">
                                    <input
                                        type="checkbox"
                                        data-testid={`todoStatus${index}`}
                                        checked={isTodoCompleted(todo)}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />
                                    {editRowId !== todo.id ?
                                        <span data-testid={`todoContent${index}`} onDoubleClick={() => onDoubleClickItem(todo.id)}>{todo.content}</span> :
                                        <input
                                            data-testid={`todoEdit${index}`}
                                            ref={editInputRef}
                                            className="Todo__input"
                                            placeholder="Edit what need to be done?"
                                            onKeyDown={(e) => onEditTodo(e, todo.id)}
                                        />
                                    }
                                    <button
                                        data-testid={`todoDelete${index}`}
                                        className="Todo__delete"
                                        onClick={() => onDeleteSingleTodo(todo.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        }
                        return null
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" data-testid="showAll" onClick={()=> setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" data-testid="showActive" onClick={()=> setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" data-testid="showCompleted" onClick={()=> setShowing(TodoStatus.COMPLETED)}>
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
