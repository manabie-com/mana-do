import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from '../../store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    updateTodoContent,
    AppActions
} from '../../store/actions';
import Service from '../../service';
import './ToDoPage.css'
import { EnhanceTodoStatus, Todo, TodoStatus } from '../../models'
import ToDoItem, { ToDoItemProps } from '../../components/ToDoItem/ToDoItem';
import ToDoInput from '../../components/ToDoInput/ToDoInput';
import ToDoToolbar, { ToDoToolbarProps } from '../../components/ToDoToolbar/ToDoToolbar';
import { remainTodoActive } from '../../utils';



const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);
    const [todoEditId, setTodoEditId] = useState<string>('');
    const EMPTY_MSG = "*Let's give things you want to focus and make it done";
    const remainTodos: number = remainTodoActive(todos);
    const todos$ = todos.filter((todo: Todo) => showing === 'ALL' ? todo : (showing === todo.status));

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp));
        })()
    }, []);

    // Update localStorage every todos has changed
    useEffect(()=>{
        (async ()=>{
            // Make sure todos is available
            if (todos.length >= 0) {
                await Service.saveTodos(todos);
            }
        })()
    }, [todos]);

    const confirmDelete = (msg: string, fn: AppActions) => {
        if (window.confirm(msg)) {
            dispatch(fn);
        }
    }

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
        if (remainTodos > 0) {
            confirmDelete(`Are you sure to delete all todos? Still ${remainTodos} uncompleted`, deleteAllTodos());
        } else {
            dispatch(deleteAllTodos());
        }
    }

    const onDeleteTodo = (todoId: string) => {
        const todo: Todo = todos.find(todo => todo.id === todoId) as Todo;
        if (todo.status === TodoStatus.ACTIVE) {
            confirmDelete(`Are you sure to delete "${todo?.content}"? It's not finished yet!`, deleteTodo(todoId));
        } else {
            dispatch(deleteTodo(todoId));
        }
    }

    const onHandleEditTodo = (todoId: string) => {
        setTodoEditId(todoId)
    }

    const onEnterEditTodo = (todoId: string, newContent: string) => {
        dispatch(updateTodoContent(todoId, newContent));
        onHandleEditTodo('');
    }

    // define props for components
    const toDoToolbarProps: ToDoToolbarProps = {todos, showing, remainTodos, onToggleAllTodo, setShowing, onDeleteAllTodo};

    return (
        <>
            <h1 className="title">Todos</h1>
            <div className="ToDo__container">
                <ToDoInput inputRef={inputRef} onCreateTodo={onCreateTodo}/>
                <div className="ToDo__list">
                    {   
                        // filter buttons work incorrectly cause todos always render all todos
                        // Should filter by showing before render
                            todos$.length ? 
                                todos$.map((todo: Todo) => {
                                    const ToDoItemProps: ToDoItemProps = {todo, todoEditId, onDeleteTodo, onUpdateTodoStatus, onHandleEditTodo, onEnterEditTodo};
                                    return <ToDoItem key={todo.id} {...ToDoItemProps}/>
                                }) :
                                (<span className='ToDo__empty-msg'>{EMPTY_MSG}</span>)
                    }
                </div>
                <ToDoToolbar {...toDoToolbarProps} />
            </div>
        </>
    );
};

export default ToDoPage;