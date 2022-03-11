import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
} from './store/actions';
import Service from './service';

import {TodoStatus} from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);
    const [changeDoubleClick, setChangeDoubleClick] = useState(false);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
            setShowing(TodoStatus.COMPLETED);
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key ==='Enter') {
            //I found a bug in here. I have try but I did not have exp about Redux to fix it yet.
            const resp = await Service.createTodo(inputRef.current.value);
            sessionStorage.setItem(inputRef.current.value.toString(), inputRef.current.value);
            dispatch(createTodo(resp));
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        console.log(e.target.checked)
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteTodo = (index: string) => {
        dispatch(deleteTodo(index));
    }

    const handleDoubleClick = (e: any) => {
        setChangeDoubleClick(!changeDoubleClick);
    }

    const handleDoubleClickChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key ==='Enter') {
            console.log(inputRef)
            setChangeDoubleClick(!changeDoubleClick);
        }
    }


    return (
        <div className="ToDo__container">
            <h1>Todo List</h1>
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
                                <input
                                    type="checkbox"
                                    checked={showing === todo.status}
                                    //using todo id instead index
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {(changeDoubleClick === false) ? (
                                    <span onDoubleClick={(e) => handleDoubleClick(e)}>{todo.content}</span>
                                ) : (
                                    <input type="text" ref={inputRef} style={{marginRight: "14rem"}} onKeyDown={handleDoubleClickChange}/>
                                )}
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
                    <input
                        type="checkbox"
                        onChange={(e) => onToggleAllTodo(e)}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Action__btn">
                        All
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
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