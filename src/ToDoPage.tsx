import React, { useEffect, useReducer, useRef, useState } from 'react';
import { TodoStatus } from './models/todo';
import Service from './service';
import {
    createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, UpdateTodoContent, updateTodoStatus
} from './store/actions';
import reducer, { initialState } from './store/reducer';
import { isTodoCompleted } from './utils';


type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    //idInputSelected to check which input is selected to edit
    const [idInputSelected, setIdInputSelected] = useState('');
    // this State to set value of the input which is editing.
    const [valueContent, setValueContent] = useState<string>();

    useEffect(()=>{
        (async () => {
            //Set todos = localStorage todoList when refresh page
            const resp = await Service.getTodos();
            // const resp = JSON.parse(localStorage.getItem("todoList") || '');
            if (resp.length) {
                dispatch(setTodos(resp));
            }
        })()
    }, [])

    //Function sue for set Item to LocalStorage
    const setItemLocalStorage = () => {
        localStorage.setItem("todoList", JSON.stringify(todos));
    }
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // check if value == '' when Enter
        if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            //setItem to localStorage after update todos
            setItemLocalStorage();
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        await dispatch(updateTodoStatus(todoId, e.target.checked))
        //setItem to localStorage after update todos
        setItemLocalStorage();
    }

    const onToggleAllTodo =async (e: React.ChangeEvent<HTMLInputElement>) => {
        await dispatch(toggleAllTodos(e.target.checked))
        //setItem to localStorage after update todos
        setItemLocalStorage();
    }

    const onDeleteAllTodo = async () => {
        await dispatch(deleteAllTodos());
        //setItem to localStorage after update todos
        setItemLocalStorage();
    }
    // This function create for setItem to localStorage
    const onDeleteTodo = async (todoId: string) => {
        await dispatch(deleteTodo(todoId));
        setItemLocalStorage();
    }

    //function that change content of todo if press 'Enter'
    const onChangeValueTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter') {   
            //if press Enter, change input to span
            setIdInputSelected('')
            if (valueContent) {
                // if it have valueContent, update todo content
                await dispatch(UpdateTodoContent(todoId, valueContent));
                setItemLocalStorage();
            }
        }
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
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                    data-testid="todoInput"
                />
            </div>
            {/* Move buttons to above List todo*/}
            <div className="Todo__toolbar">
                <div style={{width: '20px'}}>
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                </div>
                {/* Add active atribute for button that selected*/}
                <div className="Todo__tabs">
                    <button
                        className={showing === 'ALL' ? "Action__btn_active" : 'Action__btn'}
                        onClick={() => setShowing('ALL')}
                    >
                        All
                    </button>
                    <button
                        className={showing === TodoStatus.ACTIVE ? "Action__btn_active" : 'Action__btn'}
                        onClick={() => setShowing(TodoStatus.ACTIVE)}
                    >
                        Active
                    </button>
                    <button
                        className={showing === TodoStatus.COMPLETED ? "Action__btn_active" : 'Action__btn'}
                        onClick={() => setShowing(TodoStatus.COMPLETED)}
                    >
                        Completed
                    </button>
                </div>
                <button
                    className="Action__btn"
                    onClick={() => {
                        onDeleteAllTodo();
                        setShowing('ALL')
                    }}
                >
                    Clear all todos
                </button>
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
                                {/*If idInputSelected=== '', show <span></span>, else show <input></input>*/}
                                {!idInputSelected ?
                                    <span
                                        //if double click in span, the todo.id input will show, and you can edit content
                                        onDoubleClick={(e) => setIdInputSelected(todo.id)}
                                        data-testid={`todoSpan-${index}`}
                                    >
                                            {todo.content}
                                    </span> : 
                                <input
                                    key={todo.id}
                                    className={idInputSelected !== todo.id ? 'customInput' :'inputActive'}
                                    type="text"
                                    defaultValue={todo.content}
                                    // onBlur and autoFocus to check if you click outside input
                                    onBlur={() => setIdInputSelected('')}
                                    autoFocus={idInputSelected === todo.id}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onChangeValueTodo(e, todo.id)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setValueContent(e.target.value);}}
                                >
                                </input>
                                }
                                <button
                                    className="Todo__delete"
                                    //change dispatch  to function onDeleteTodo 
                                    onClick={() => onDeleteTodo(todo.id)}
                                >
                                    X
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