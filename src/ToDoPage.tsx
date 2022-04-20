import React, {useReducer, useRef, useEffect, useState} from 'react';
import reducer, {initialState} from './store/reducer';
import {
    createTodo,
    setTodos,
} from './store/actions';
import Service from './service';
import { EnhanceTodoStatus} from './models/todo';
import TodoList from './components/listTodo/listTodo';
import TodoToolbar from './components/toolbarTodo/toolbarTodo';

const ToDoPage = () => {
    const [{todos},dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ''; // Clear input value after add Todo
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
            <TodoList todos={todos} dispatch={dispatch} showing={showing}/>
            <TodoToolbar todos={todos} dispatch={dispatch} setShowing={setShowing}/>
        </div>
    );
};

export default ToDoPage;