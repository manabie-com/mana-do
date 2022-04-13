import React, { useEffect, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
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
    const createInputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        setTodoList(todos);
    }, [todos])

    const onFilterTodo = (status: EnhanceTodoStatus) => {
        const filteredTodos = todos.filter(todo => todo.status === status || status === 'ALL')

        setTodoList(filteredTodos);
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

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
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
                    todoList.map((todo, index) => <TodoItem key={index} todo={todo} dispatch={dispatch} />)
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
}

export default ToDoPage;