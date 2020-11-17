import React, { useRef, useState } from 'react';

import {Todo, TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';

import './styles.css'

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface Props {
  todos: Todo[]
  onCreateTodo: (value: string) => void
  onUpdateTodoStatus: (id: string, checked: boolean) => void
  onToggleAllTodos: (checked: boolean) => void
  onDeleteAllTodos: () => void
  onDeleteTodo: (id: string) => void
  onUpdateTodo: (id: string, value: string) => void
}

const ToDoPage = ({ todos, onCreateTodo, onUpdateTodoStatus, onToggleAllTodos, onDeleteAllTodos, onDeleteTodo, onUpdateTodo }: Props) => {
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const todoInputRef = useRef<HTMLInputElement>(null);
    const todoEditRef = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState('')

    const handleCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && todoInputRef.current) {
            onCreateTodo(todoInputRef.current.value)
            todoInputRef.current.value = '';
        }
    }

    const handleUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        onUpdateTodoStatus(todoId, e.target.checked)
    }

    const handleToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
       onToggleAllTodos(e.target.checked)
    }

    const handleDeleteAllTodos = () => {
        onDeleteAllTodos();
    }

    const handleTodoDoubleClick = (todoId: string) => {
        function handler() {
            setEditing(todoId)
        }
        return handler
    }

    const handleBlurOnEditing = () => {
        setEditing('')
    }

    const handleUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && todoEditRef.current) {
            onUpdateTodo(editing, todoEditRef.current.value)
            todoEditRef.current.value = '';
            handleBlurOnEditing()
        }
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

    const getActionClasses = (status: EnhanceTodoStatus) => {
        return status === showing ? 'Todo__tab Tab__active' : 'Todo__tab'
    };

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={todoInputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={handleCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    showTodos.length > 0
                    ? showTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => handleUpdateTodoStatus(e, todo.id)}
                                />
                                {
                                    editing !== todo.id
                                    ? <span onDoubleClick={handleTodoDoubleClick(todo.id)}>{todo.content}</span>
                                    : <input
                                        type="text"
                                        className="ToDo__edit"
                                        ref={todoEditRef}
                                        autoFocus
                                        onBlur={handleBlurOnEditing}
                                        onKeyDown={handleUpdateTodo}
                                    />
                                }
                                <button
                                    className="Todo__delete"
                                    onClick={() => onDeleteTodo(todo.id)}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                    : <>No Todos</>
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={handleToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={getActionClasses('ALL')} onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className={getActionClasses(TodoStatus.ACTIVE)} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={getActionClasses(TodoStatus.COMPLETED)} onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__danger" onClick={handleDeleteAllTodos}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;
