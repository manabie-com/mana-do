import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [todoName, setTodoName] = useState('')

    // This func is used to get todo-list
    const handleGetTodoList = async () => {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
    }

    // This hook is used to get todo-list
    useEffect(()=>{
        handleGetTodoList()
    }, [])

    // Submit to create todo-list
    const onCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const resp = await Service.createTodo(todoName)
        dispatch(createTodo(resp))
        setTodoName('')
    }

    // The change event to handle change todo-name
    const handleChangeTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoName(event.target.value)
    }

    // The change event to handle change todo-status
    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        await Service.updateTodo(todoId, { status })
        dispatch(updateTodoStatus(todoId, status))
    }

    // This func is used to check/un-check all todo-item
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    // This func is used to DELETE ALL todo-item
    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    // Filter todo-list based on "showing" variable
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

    // TBD
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            {/* Todo Form */}
            <form className="Todo__creation" onSubmit={onCreateTodo}>
                <input
                    value={todoName}
                    required
                    name="todo_name"
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onChange={handleChangeTodoName}
                />
            </form>
            {/* Todo List */}
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span>{todo.content}</span>
                                <button
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
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
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