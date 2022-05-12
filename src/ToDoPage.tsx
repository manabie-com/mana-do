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
import { TodoStatus, Todo } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [alertVariant, setAlertVariant] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const memoizedReducer = React.useCallback(reducer,[]);
    const [{todos}, dispatch] = useReducer(memoizedReducer,initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(TodoStatus.COMPLETED);
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        const item: string | null = localStorage.getItem('todoDATA'); //getting from local storage
        if(item){// if item has a value
            let data: Todo[] = JSON.parse(item); // parse the string into readable object
            localStorage.setItem('todoDATA',JSON.stringify(data)); // parse the JSON object into readable JSON string
            dispatch(setTodos(data)); // updating todo data from reducer
        }else{ dispatch(setTodos([]));} //if item has no value yet from localStorage, set the todos in the reducer to empty
    }, [])
    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked)) //calling function to update with parameters todoId and boolean value from a check component
        setAlertMessage("Successfuly updated.");
        setAlertVariant("success");
        setShowAlert(true);
    }
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }
    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos()); //calling function to remove todos value from reducer
        dispatch(setTodos([])); //empty todos value in reducer

        localStorage.setItem('todoDATA',JSON.stringify([])); //empty values in localStorage of todoDATA

        setAlertMessage("Successfuly removed.");
        setAlertVariant("success");
        setShowAlert(true);
    }
    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId)); //calling function to remove a certain todo, with parameter todoId

        localStorage.setItem('todoDATA',JSON.stringify(todos));

        setAlertMessage("Successfuly removed.");
        setAlertVariant("success");
        setShowAlert(true);
    }
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {  
        if (e.key === 'Enter' ) { // if event pressed in keyboard is Enter
            const resp: Todo = await Service.createTodo(inputRef.current.value); //current values in input
            dispatch(createTodo(resp)); //calling function to create todo, accept parameters
            const item: string | null = localStorage.getItem('todoDATA'); //getting todo data stored in local storage
            if(item){ //if item exist
                let data: Todo[] = JSON.parse(item); // parse the string into readable object
                data.push(resp); //appending new record into stored todo in localStorage
                localStorage.setItem('todoDATA',JSON.stringify(data)); // parse the string into readable JSON string
            }else{
                let array: Todo[] = []; //declaring empty array todo
                array.push(resp); //storing inputted data into variable
                localStorage.setItem('todoDATA',JSON.stringify(array)); //storing to localStorage
            }
            setAlertMessage("Successfuly added.");
            setAlertVariant("success");
            setShowAlert(true);
        }
    }
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(updateTodoName(index, e.target.value));
        dispatch(setTodos(todos));

        localStorage.setItem('todoDATA',JSON.stringify(todos));
    }
    const saveTodo = () => {
        setEditMode(false);
        setAlertMessage("Successfuly updated.");
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
                                {   editMode ? <div style={{marginBottom: "20px"}}><input value={todo.content} //if editMode, fields will turn into form input
                                    onChange={(e) => inputHandler(e, index)} 
                                    /></div>
                                // if not edit mode, will appear as element, and clickable with function to trigger edit mode 
                                : <p onDoubleClick={()=>setEditMode(true)}>{todo.content}</p>}
                                </div>
                                
                                {/* if edit mode, just no a fragment or empty, else button will appear for remove todo element */}
                                {editMode ? <React.Fragment></React.Fragment> : <button onClick={()=>onDeleteTodo(todo.id)}className="Todo__delete">X</button>}
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
            { showAlert && 
            <Alert style={{marginTop: "10px"}} variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {`${alertMessage}`}
            </Alert>}
        </div>
    );
};

export default ToDoPage;