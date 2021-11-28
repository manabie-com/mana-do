import React, {useEffect, useRef, useState} from 'react';
import {isTodoCompleted} from '../utils';


const ToDoItem = (props: any) => {
    const [edit, setEdit] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const [defaultData, setDefaultData]= useState<string>('')
    const [editData, setEditData] = useState<string>(props.todo.content)
    useEffect(()=> {
        setDefaultData(props.todo.content)
    }, [props.todo.content])
    return <>
        <div className="ToDo__item"
             onDoubleClick={event => {
                 setEdit(true)
                 if (inputRef
                     && inputRef.current
                     && inputRef.current.value) {
                     setEditData(defaultData)
                     inputRef.current.value = defaultData
                 }
             }}>
            <input
                type="checkbox"
                checked={isTodoCompleted(props.todo)}
                onChange={(e) =>
                    props.onUpdateTodoStatus(e, props.todo.id)}
            />
            <div className="todo-wrapper">
                {edit ? <div className="input-todo-item">
                        <input
                            autoFocus={true}
                            ref={inputRef}
                            value={editData}
                            onChange={e => {
                                setEditData(e.target.value)
                            }}
                            onBlur={(e) => {
                                setEdit(false)
                                setEditData(defaultData)
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && inputRef
                                    && inputRef.current
                                    && inputRef.current.value) {
                                    props.onEditTodo(inputRef.current.value, props.todo)
                                    setEdit(false)
                                }
                            }}
                        />
                    </div> :
                    <span>{props.todo.content}</span>}

                <button
                    className="Todo__delete"
                    onClick={() => {
                        props.onDeleteTodo(props.todo.id)
                    }}>
                    X
                </button>
            </div>
        </div>
    </>;
};

export default ToDoItem;