import React, {useEffect, useReducer, useRef, useState} from 'react';
import { Button, Alert } from 'react-bootstrap';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    updateTodoName
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [todoContent, setTodoContent] = React.useState("");
    const [todoId, setTodoId] = React.useState(0);
    const [alertVariant, setAlertVariant] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const memoizedReducer = React.useCallback(reducer,[]);
    const [{todos}, dispatch] = useReducer(memoizedReducer,initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.COMPLETED);
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }
    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }
    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId))
    }
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {  
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            localStorage.setItem('todoDATA',JSON.stringify(resp));
        }
    }
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(updateTodoName(index, e.target.value));
    }
    const saveTodo = () => {
        setEditMode(false);
        displayAlert();
    }
    const displayAlert = () => {
        setAlertMessage("Success");
        setAlertVariant("success");
        setShowAlert(true);
    }
    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    // onKeyDown={onCreateTodo}
                    onKeyPress={(e)=>{onCreateTodo(e)}}
                />
            </div>
            <div className="ToDo__list">
                {
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item" >
                                <input
                                    type="checkbox"
                                    checked={showing === todo.status}   
                                    onChange={(e) => onUpdateTodoStatus(e, index)}
                                />
                                <div style={{display: "block", marginRight: "auto", marginLeft: "auto"}}>
                                {   editMode ? <div style={{marginBottom: "20px"}}><input value={todo.content}
                                    onChange={(e) => inputHandler(e, index)} 
                                    // onKeyPress={(eL)=>{onUpdateTodoName(eL)}} 
                                    /></div>
                                : <p onDoubleClick={()=>setEditMode(true)}>{todo.content}</p>}
                                </div>
                                {editMode ? null : <button onClick={()=>onDeleteTodo(todo.id)}className="Todo__delete">X</button>}
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
                    <Button style={{marginRight: "10px"}} variant="light" size="sm" onClick={()=>setShowing(TodoStatus.ACTIVE || TodoStatus.COMPLETED )}>
                        All
                    </Button>
                    <Button style={{marginRight: "10px"}} variant="primary" size="sm"onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </Button>
                    <Button style={{marginRight: "10px"}} variant="success" size="sm" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </Button>
                </div>
                <Button variant="info" style={{marginRight: "10px"}} size="sm" onClick={saveTodo}>
                    Save
                </Button>
                <Button variant="danger" style={{marginRight: "10px"}}  size="sm" onClick={onDeleteAllTodo}>
                    Clear all todos
                </Button>
            </div>
            { showAlert && <Alert style={{marginTop: "10px"}} variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {`${alertMessage}`}
            </Alert>}
        </div>
    );
};

export default ToDoPage;