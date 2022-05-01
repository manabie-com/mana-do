import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { STORAGE_KEY } from '../../constants';

import TodoToolbar from './partial/TodoToolbar';
import TodoList from './partial/TodoList';

const ALL: string = "ALL";
type EnhanceTodoStatus = TodoStatus | typeof ALL;

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>(ALL);
    const inputRef = useRef<any>(null);
    const isPageLoad = useRef<boolean>(false);

    useEffect(()=>{
        // (async () => {
            // const resp = await Service.getTodos();
            const response: any = localStorage.getItem(STORAGE_KEY) ;
            let datas = JSON.parse(response);
            dispatch(setTodos(datas));
        // })()
    }, []);
    
    useEffect(() => {
        if (isPageLoad.current) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } else {
            isPageLoad.current = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(todos)]);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                // prevent add new todo if input value is empty
        if (e.key === 'Enter' && inputRef.current.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ""; // clear input value
            setShowing(ALL); // avoid confusing for user experience
        }
    };


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
            <small className='Todo__note'>Press ENTER to add your TODO</small>
            <TodoToolbar
                todos={todos}
                showing={showing}
                setShowing={setShowing}
                dispatch={dispatch}
            />
            <TodoList
                todos={todos}
                showing={showing}
                setShowing={setShowing}
                dispatch={dispatch}
            />
        </div>
    );
};

export default ToDoPage;