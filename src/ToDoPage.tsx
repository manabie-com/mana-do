import React, {useEffect, useReducer, useRef} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteTodo,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import { TodoStatus, EnhanceTodoStatus } from './models/todo';

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onFilterTodo = async (status: EnhanceTodoStatus) => {
        const resp = await Service.getTodos(status);
        dispatch(setTodos(resp || []));
    }

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    }

    const onUpdateTodoStatus = async (todoStatus: TodoStatus, todoId: any) => {
        const status = todoStatus === TodoStatus.ACTIVE ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        dispatch(updateTodoStatus(todoId, status));
        await Service.updateTodoStatus(todoId, status);
    }

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        dispatch(toggleAllTodos(status));
        await Service.updateManyTodoStatus(todos.map(({ id }) => id), status);
    }

    const onDeleteTodo = async (id: string) => {
        dispatch(deleteTodo(id));
        await Service.deleteTodo(id);
    }

    const onDeleteAllTodo = async () => {
        dispatch(deleteAllTodos());
        await Service.deleteAllTodos();
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
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={todo.status === TodoStatus.COMPLETED}
                                    onChange={(e) => onUpdateTodoStatus(todo.status, todo.id)}
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
                    <button className="Action__btn" onClick={() => onFilterTodo('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={() => onFilterTodo(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => onFilterTodo(TodoStatus.COMPLETED)}>
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