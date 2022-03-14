import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    updateTodo,
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

    /**
     * Create state edit to listen event click outside
     * Create toDoRef for reference to element be clicked on
     */
    const [edit, setEdit] = useState(false);
    const [editID, setEditID] = useState('');
    const toDoRef = useRef<any>(null);

    useEffect(()=>{
        if (localStorage.getItem("myTodo")){
            const resp = JSON.parse(localStorage.getItem("myTodo") || "");
            dispatch(setTodos(resp || []));
        }
        /**
         * Listening event click outside
         * User can edit task by clicking on it, when click outside edit action will discard
         */
        let handleClickOutside = (event:MouseEvent) => {
            if (!toDoRef.current.contains(event.target)){
                setEdit(false);
                inputRef.current.value=null;
            }else{
                setEdit(true);
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            if(inputRef.current.value.trim() === '') {
                alert('Please enter new task name')
            }else{
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                /**
                 * After user enter the new task, the app will reset the input field
                 */
                inputRef.current.value= null;
                alert('Create new task success!')
            }
        }
    }
    /**
     * Create handle edit task action
     */
    const onEditTodo = async(e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === 'Enter' ) {
            console.log(`taskID - ${editID} has been updated`);
            dispatch(updateTodo(editID,inputRef.current.value))
            /**
             * After user enter to edit task, the app will reset the input field
             */
            inputRef.current.value= null;
            inputRef.current.blur();
            alert('Edit task success!')
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


    return (
        <div className="ToDo__container">
            <h4 className="ToDo_header"><span>Manabie</span> To Do App</h4>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={!edit? onCreateTodo: onEditTodo}
                />
            </div>
            <div className="ToDo__list" ref={toDoRef}>
                {
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={showing === todo.status}
                                    onChange={(e) => {
                                        setShowing(TodoStatus.COMPLETED)
                                        onUpdateTodoStatus(e, todo.id)
                                    }}
                                />
                                <span onDoubleClick={()=>{
                                    if(edit){
                                        inputRef.current.focus();
                                        inputRef.current.value = todo.content;
                                        setEditID(todo.id)
                                    }
                                }}>{todo.content}</span>
                                <button
                                    className="Todo__delete"
                                    onClick={() =>{
                                        dispatch(deleteTodo(todo.id));
                                        alert('Task delete success!')
                                    }}
                                >
                                    <i style={{color: 'red', fontSize:'20px'}} className="fa fa-trash" aria-hidden="true"></i>
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
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={`Action__btn ${showing==="ALL"? "active": ""}`} onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className={`Action__btn ${showing==="ACTIVE"? "active": ""}`} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={`Action__btn ${showing==="COMPLETED"? "active": ""}`} onClick={()=>setShowing(TodoStatus.COMPLETED)}>
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