import React, {Fragment, useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import { Todo, EnhanceTodoStatus, TodoStatus } from './models/todo';
import { deleteTodo } from './store/actions';
import { TodoItem } from './components/TodoItem';
import { Filterer } from './components/Filterer';

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp: Todo[] = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = "";
        }
    }

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
                <input ref={inputRef} className="Todo__input" placeholder="What need to be done?" onKeyDown={onCreateTodo} />
                <div className="message">Check all completed todos</div>
            </div>
            <div className="ToDo__list">
                {
                    todos.filter((todo: Todo) => showing === todo.status || showing === 'ALL').map((todo: Todo, index: number) => {
                        return (
                            <Fragment key={index}>
                                <TodoItem todo={todo} index={index} handleUpdate={onUpdateTodoStatus} handleDelete={onDeleteTodo} />
                            </Fragment>
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <div className="Toggle__all__container">
                        <input
                            id="Toggle__all"
                            type="checkbox"
                            onChange={onToggleAllTodo}
                        />
                        <label htmlFor="Toggle__all">
                            { todos.every(todo => todo.status === TodoStatus.ACTIVE) ? 'Complete all': 'Reactivate all' }
                        </label>
                    </div> : <div/>
                }
                <Filterer setShowing={setShowing} />
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;