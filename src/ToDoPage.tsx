import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    changeTodoMode,
    updateTodoContent
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

export function main() {
    const mockMode = process.env.REACT_APP_WHOAMI;
    return mockMode;
}

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const editingInputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current?.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoContent = (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
        if (e.key === 'Enter' && editingInputRef.current?.value) {
            dispatch(updateTodoContent(todo.id, editingInputRef.current.value))
            dispatch(changeTodoMode(todo.id, !todo.isEditing))
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

    const showTodos = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div data-testid="todo-page" className="ToDo__container">
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
                    showTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    data-testid={`${todo.id}__status`}
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                    {todo.isEditing ?
                                        <input 
                                            type="text"
                                            ref={editingInputRef}
                                            autoFocus
                                            name="editTodoInput"
                                            className="Todo__input--editing"
                                            defaultValue={todo.content}
                                            onKeyDown={(e) => onUpdateTodoContent(e, todo)}
                                            onBlur={() => dispatch(changeTodoMode(todo.id, !todo.isEditing))}
                                        />
                                        : 
                                        <span 
                                            className="Todo__content"
                                            onDoubleClick={() => {dispatch(changeTodoMode(todo.id, !todo.isEditing))}}
                                        >
                                            {todo.content}
                                        </span> 
                                    }
                                <button
                                    data-testid={`${todo.id}__delete`}
                                    className="Todo__delete"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
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
                        data-testid="toggle-all"
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={`Action__btn ${showing === 'ALL' ? "active" : ""}`} onClick={()=>setShowing('ALL')}>
                        All ({todos.length})
                    </button>
                    <button className={`Action__btn ${showing === TodoStatus.ACTIVE ? "active" : ""}`} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active ({todos.filter((todo) => todo.status === TodoStatus.ACTIVE).length})
                    </button>
                    <button className={`Action__btn ${showing === TodoStatus.COMPLETED ? "active" : ""}`} onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed ({todos.filter((todo) => todo.status === TodoStatus.COMPLETED).length})
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