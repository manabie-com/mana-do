import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    showEditFormTodo,
    closeAllEditForm,
    updateTodoContent,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import { RiDeleteBin5Line } from 'react-icons/ri';
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);
    const [editContentTodo, setEditContentTodo] = useState('');    
    const ref = useRef<HTMLDivElement>(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            dispatch(closeAllEditForm());
        }
    };

    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            dispatch(closeAllEditForm());
        } 
    };

    useEffect(()=>{
        (async ()=>{
            document.addEventListener('keydown', handleHideDropdown, true);
            document.addEventListener('click', handleClickOutside, true);
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
            return () => {
                document.removeEventListener('keydown', handleHideDropdown, true);
                document.removeEventListener('click', handleClickOutside, true);
            };
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ''; // Clear input value after add Todo
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

    const deleteSelectTodo = (e: React.MouseEvent<HTMLButtonElement>, todoId: any) => {
        dispatch(deleteTodo(todoId));
    }

    const showEdit = (e: React.MouseEvent<HTMLDivElement>, todo: any) => {
        if(e.detail === 2) {
            setEditContentTodo(todo.content);
            dispatch(showEditFormTodo(todo.id));
        }
    }

    const changeValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContentTodo(e.target.value);
    }

    const updateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todo: any) => {
        if (e.key === 'Enter' ) { 
            dispatch(updateTodoContent(todo.id, editContentTodo));
        }
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list" ref={ref}>
                {
                    todos.map((todo, index) => {
                        return (
                            (showing === todo.status || showing === 'ALL') && (
                                <div key={index} className="ToDo__item" onClick={(e) => showEdit(e, todo)}>
                                    <input
                                        type="checkbox"
                                        //checked={showing === todo.status}
                                        checked={todo.status === 'COMPLETED' ? true : false}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />
                                    {
                                        todo.editContent && (<input type="text" value={editContentTodo} onKeyDown={(e) => {updateTodo(e, todo)}} onChange={(e) => changeValueInput(e)} className="Todo__input--edit"/>)
                                    }
                                    {
                                        !todo.editContent && (<span>{todo.content}</span>)
                                    }
                                    <button
                                        className="Todo__delete"
                                        onClick={(e) => deleteSelectTodo(e, todo.id)}
                                    >
                                        <RiDeleteBin5Line height={'16px'} width={'16px'}/>
                                    </button>
                                </div>
                            )
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : ''
                }
                <div className="Todo__tabs">
                    <button className="Action__btn primary" onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn filter" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn filter" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn delete" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;