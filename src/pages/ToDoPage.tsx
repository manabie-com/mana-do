import React, {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from '../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../store/actions';
import Service from '../service';
import {TodoStatus} from '../models/todo';
import {isTodoCompleted} from '../utils';
import {TodoCreation} from "../components/TodoCreation";
import {TodoList} from "../components/TodoList";
import {Button} from "../components/Button";

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [state/*{todos}*/, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const todos = useMemo(() => state.todos, [state])
    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        console.log('onUpdateTodoStatus')
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const filterByStatus = (status: EnhanceTodoStatus) => todos.filter(todo => status === 'ALL' || status === todo.status)

    const showTodos = filterByStatus(showing)

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            <TodoCreation onKeyDown={onCreateTodo} ref={inputRef}/>
            <TodoList todos={showTodos} updateItem={onUpdateTodoStatus}
                      deleteItem={(id: string) => dispatch(deleteTodo(id))}/>

            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <Button text={'All'} className="Action__btn" onClick={() => setShowing('ALL')}/>
                    <Button text={'Active'} className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}/>
                    <Button text={'Completed'} className="Action__btn"
                            onClick={() => setShowing(TodoStatus.COMPLETED)}/>
                </div>
                <Button text={'Clear all todos'} className="Action__btn" onClick={onDeleteAllTodo}/>
            </div>
        </div>
    );
};

export default ToDoPage;