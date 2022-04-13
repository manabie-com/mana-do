import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos
} from './store/actions';
import TodoItem from './components/TodoItem'
import Service from './service';
import { Todo, TodoStatus } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

function ToDoPage() {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [todoList, setTodoList] = useState<Array<Todo>>([]);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const createInputRef = useRef<any>(null);
    const updateInputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        onFilterTodo(!todos.length ? 'ALL' : showing);
    }, [todos, showing])

    const onFilterTodo = (status: EnhanceTodoStatus) => {
        const filteredTodos = status === 'ALL' ? todos : todos.filter(todo => todo.status === status)
        setTodoList(filteredTodos);
        setShowing(status);
    }

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const { value } = createInputRef.current
            if (value?.trim()?.length) {
                const resp = await Service.createTodo(value);
                dispatch(createTodo(resp));
                createInputRef.current.value = '';
            }
        }
    }

    const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
        if (e.key === 'Enter') {
            const { value } = updateInputRef.current
            if (value?.trim()?.length) {
                dispatch(updateTodo({ ...todo, content: value }));
                updateInputRef.current.blur()
            }
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        dispatch(updateTodo({ ...todo, status: e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }));
    }

    const onDeleteTodo = (todoId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            //eslint-disable-line
            dispatch(deleteTodo(todoId));
        }
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked));
    }

    const onDeleteAllTodo = () => {
        if (window.confirm('Are you sure you want to clear all todo items?')) {
            //eslint-disable-line
            dispatch(deleteAllTodos());
            onFilterTodo('ALL');
        }
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={createInputRef}
                    type="text"
                    className="Todo__input"
                    placeholder="What needs to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="list__heading">{todoList.length} task{todoList.length > 1 ? 's' : ''}</div>
            <div className="ToDo__list">
                {
                    todoList.map((todo, index) => <TodoItem key={index} todo={todo} updateInputRef={updateInputRef} onUpdateTodo={onUpdateTodo} onUpdateTodoStatus={onUpdateTodoStatus} onDeleteTodo={onDeleteTodo} />)
                }
            </div>
            <div className="Todo__toolbar">
                {todoList.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className={`Action__btn${showing === 'ALL' ? ' active' : ''}`} onClick={() => onFilterTodo('ALL')}>
                        All
                    </button>
                    <button className={`Action__btn${showing === TodoStatus.ACTIVE ? ' active' : ''}`} onClick={() => onFilterTodo(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={`Action__btn${showing === TodoStatus.COMPLETED ? ' active' : ''}`} onClick={() => onFilterTodo(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="clear__btn" onClick={onDeleteAllTodo} disabled={!todos.length}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
}

export default ToDoPage;