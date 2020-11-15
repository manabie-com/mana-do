import React, { useRef, useState } from 'react';

import {Todo, TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

interface Props {
  todos: Todo[]
  onCreateTodo: (value: string) => void
  onUpdateTodoStatus: (id: string, checked: boolean) => void
  onToggleAllTodos: (checked: boolean) => void
  onDeleteAllTodos: () => void
  onDeleteTodo: (id: string) => void
}

const ToDoPage = ({ todos, onCreateTodo, onUpdateTodoStatus, onToggleAllTodos, onDeleteAllTodos, onDeleteTodo }: Props) => {
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            onCreateTodo(inputRef.current.value)
            inputRef.current.value = '';
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
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={handleCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => handleUpdateTodoStatus(e, todo.id)}
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
                        checked={activeTodos === 0}
                        onChange={handleToggleAllTodo}
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
                <button className="Action__btn" onClick={handleDeleteAllTodos}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;
