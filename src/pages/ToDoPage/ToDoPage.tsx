import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
} from '../../store/actions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';
import './ToDoPage.css'
import { isTodoCompleted } from '../../utils';
import { Todo } from '../../models'

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            console.log('tutu', resp)

            dispatch(setTodos(resp));
        })()
    }, []);

    useEffect(()=>{
        (async ()=>{
            // Make sure todos is available
            if (todos.length >= 0) {
                await Service.saveTodos(todos);
            }
        })()
    }, [todos]);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Make sure that todo input is not empty or all white space
        if (e.key === 'Enter' && inputRef.current.value.trim()) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    // Limit use any type
    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
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
            <div className="ToDo__list">
                {   
                    // filter buttons work incorrectly cause todos always render all todos
                    // Should filter by showing before render
                    todos.filter((todo: Todo) => showing === 'ALL' ? todo : (showing === todo.status))
                        .map((todo: Todo, index) => {
                            return (
                                <div key={index} className="ToDo__item">
                                    {
                                    // at checkbox, pass index to onUpdateTodoStatus is not guaranteed, 
                                    // should use todoId. Also it cause bug crashing application when click checkbox
                                    }
                                    <input
                                        type="checkbox"
                                        checked={isTodoCompleted(todo)}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                    />
                                    <span>{todo.content}</span>
                                    <button
                                        className="Todo__delete"
                                        onClick={() => onDeleteTodo(todo.id)}
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
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={"Action__btn" + (showing === "ALL" ? " active" : "")} onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className={"Action__btn" + (showing === TodoStatus.ACTIVE ? " active" : "")} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={"Action__btn" + (showing === TodoStatus.COMPLETED ? " active" : "")} onClick={()=>setShowing(TodoStatus.COMPLETED)}>
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