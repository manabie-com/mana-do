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
import './ToDoPage.css'
import { EnhanceTodoStatus, Todo } from '../../models'
import ToDoItem, { ToDoItemProps } from '../../components/ToDoItem/ToDoItem';
import ToDoInput from '../../components/ToDoInput/ToDoInput';
import ToDoToolbar, { ToDoToolbarProps } from '../../components/ToDoToolbar/ToDoToolbar';



const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

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

    // define props for components
    const toDoToolbarProps: ToDoToolbarProps = {todos, showing, onToggleAllTodo, setShowing, onDeleteAllTodo};

    return (
        <div className="ToDo__container">
            <ToDoInput inputRef={inputRef} onCreateTodo={onCreateTodo}/>
            <div className="ToDo__list">
                {   
                    // filter buttons work incorrectly cause todos always render all todos
                    // Should filter by showing before render
                    todos.filter((todo: Todo) => showing === 'ALL' ? todo : (showing === todo.status))
                        .map((todo: Todo) => {
                            const ToDoItemProps: ToDoItemProps = {todo, onDeleteTodo, onUpdateTodoStatus};
                            return <ToDoItem key={todo.id} {...ToDoItemProps}/>
                        })
                }
            </div>
            <ToDoToolbar {...toDoToolbarProps} />
        </div>
    );
};

export default ToDoPage;