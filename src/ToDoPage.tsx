import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoName
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';



const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [edit, setEdit] = useState<Number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [editText, setEditText] = useState<any>("");

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
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

    const onChangeTaskname = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter') {
            dispatch(updateTodoName(todoId, editText));
            setEditText("");
            setEdit(null);
        }
    }

    const setEditMode = (index: Number, content: string) => {
        setEdit(index);
        setEditText(content);
    }

    const changeEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    }

    const blurEditText = () => {
        setEdit(null);
        setEditText("");
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            <div>
                <h5>TO DO LIST</h5>
            </div>
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
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {edit !== null && edit === index ? 
                                    <input 
                                        autoFocus={true} 
                                        type="text" 
                                        className="Todo__Edit" 
                                        value={editText} 
                                        onChange={changeEditText} 
                                        onBlur={blurEditText} 
                                        onKeyDown={(e) => onChangeTaskname(e, todo.id)}
                                    />
                                    
                                    : 
                                    <span onDoubleClick={() => setEditMode(index, todo.content)}>{todo.content}</span>
                                }
                                <button
                                    className="Todo__delete"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
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
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={`Action__btn ${showing === 'ALL' ? 'Btn__active': ''}`} onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className={`Action__btn ${showing === TodoStatus.ACTIVE ? 'Btn__active': ''}`} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={`Action__btn ${showing === TodoStatus.COMPLETED ? 'Btn__active': ''}`}onClick={()=>setShowing(TodoStatus.COMPLETED)}>
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