import React, {useEffect, useReducer, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    createTodo,
    deleteAllTodos,
    deleteTodo,
    setTodos,
    toggleAllTodos,
    updateTodoContent,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import TodoItem from "./components/TodoItem";
import TodoInputForm from "./components/TodoInputForm";
import TodoToolbar from "./components/TodoToolbar";

export type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    // FIXED: should use ref in case necessary only
    const [input, setInput] = useState<string>('');

    useEffect(()=>{
        (async ()=>{
            try {
                const resp = await Service.getTodos();

                dispatch(setTodos(resp || []));
            } catch (e) {
                console.log(e);
            }
        })()
    }, [])

    const onCreateTodo = async () => {
        // ADDED: prevent creating an empty todo
        if (input.trim() === '') return;
        try {
            const resp = await Service.createTodo(input.trim());
            dispatch(createTodo(resp));
            // We can clear input after create successfully
            setInput('');
        } catch (e) {
            console.log(e);
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        Service.updateTodoStatus(todoId, status).then(() => {
            dispatch(updateTodoStatus(todoId, status));
        }).catch(console.log);
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        Service.onToggleAllTodo(checked).then(() => {
            dispatch(toggleAllTodos(checked))
        });
    }

    const onDeleteAllTodo = () => {
        Service.onDeleteAllTodo().then(() => {
            dispatch(deleteAllTodos());
        }).catch(console.log);
    }

    const onDeleteTodo = (todoId: string)  => {
        Service.onDeleteTodo(todoId).then(() => {
            dispatch(deleteTodo(todoId));
        }).catch(console.log);
    }

    const onUpdateTodoContent = (todoId: string, content: string) => {
        Service.onUpdateTodoContent(todoId, content).then(() => {
            dispatch(updateTodoContent(todoId, content));
        }).catch(console.log);
    }

    // This component can be split into smaller components for re-usability, testability
    return (
        <div className="ToDo__container">
            <TodoInputForm input={input}
                           setInput={setInput}
                           onCreateTodo={onCreateTodo} />
            <div className="ToDo__list">
                {
                    todos.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                // Bug fixed: should show only if showing === ALL or match the item's status
                                showing={showing === 'ALL' || showing === todo.status}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                                onDeleteTodo={onDeleteTodo}
                                onUpdateTodoContent={onUpdateTodoContent} />)
                    })
                }
            </div>
            <TodoToolbar todos={todos}
                         onToggleAllTodo={onToggleAllTodo}
                         setShowing={setShowing}
                         onDeleteAllTodo={onDeleteAllTodo} />
        </div>
    );
};

export default ToDoPage;
