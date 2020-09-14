import React, { useRef, useState} from 'react';

import TodoList from './component/todo/todo-list';
import useTodoList from './hooks/useTodoList';
import { ETodoStatus } from './types/todo';
import { isTodoCompleted } from './helper';

type EnhanceTodoStatus = ETodoStatus | 'ALL';

const ToDoPage = () => {
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const { list, loading, createTodo, deleteAllTodo, deleteTodo, updateTodoStatus, updateTodo } = useTodoList();

    const onCreateTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            const { value } = inputRef.current;
            try {
                createTodo(value);
                inputRef.current.value = '';    
            } catch (error) {
                console.log(error);
            }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        const { checked } = e.target;
        updateTodoStatus(todoId, checked);
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    }

    const onDeleteAllTodo = () => {
        if (list.length === 0) return;
        const isAgree = window.confirm('Do you want clear all your jobs ?');
        if (isAgree) {
            try {
                deleteAllTodo();
            } catch (error) {
                
            }
        }
    }

    const showTodos = list.filter((todo) => {
        switch (showing) {
            case ETodoStatus.ACTIVE:
                return todo.status === ETodoStatus.ACTIVE;
            case ETodoStatus.COMPLETED:
                return todo.status === ETodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const activeTodos = list.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
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
            {
                loading && <span>Loading</span>
            }
            {
                !loading && (
                    <TodoList list={showTodos}
                    onDelete={deleteTodo}
                    onUpdateTodoStatus={onUpdateTodoStatus}
                    onUpdate={updateTodo} />)
            }
            <div className="Todo__toolbar">
                {list.length > 0 ?
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
                    <button className="Action__btn" onClick={()=>setShowing(ETodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={()=>setShowing(ETodoStatus.COMPLETED)}>
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