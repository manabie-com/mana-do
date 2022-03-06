import React, { useEffect, useRef, useState } from 'react';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    editTodo
} from '../../actions/todo';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { useAppState } from '../../store';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{ todoReducer: { todos = [] } }, dispatch] = useAppState();
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editingTodo, setEditingTodo] = useState<string>('');
    const inputRef = useRef<any>(null);
    const editInputRef = useRef<any>(null);
    useOutside(editInputRef);

    function useOutside(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setEditingTodo('');
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
        }
    }

    const onDeleteTodo = async (id: string) => {
        await Service.deleteTodo(id);
        dispatch(deleteTodo(id));
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        const checked = e.target.checked;
        await Service.updateTodo(todoId, checked);
        dispatch(updateTodoStatus(todoId, checked));
    }

    const onToggleAllTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        await Service.toggleAllTodo(checked);
        dispatch(toggleAllTodos(checked));
    }

    const onDeleteAllTodo = async () => {
        await Service.deleteAllTodo();
        dispatch(deleteAllTodos());
    }

    const onEditTodo = async (e: any, todoId: any) => {
        if (e.key === 'Enter') {
            const text = editInputRef.current.value;
            await Service.editTodo(todoId, text);
            dispatch(editTodo(todoId, text));
            setEditingTodo('');
        }
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
                    todos.map((todo: any) => {
                        return showing === 'ALL' || showing === todo.status ? (
                            <div key={todo.id} className="ToDo__item" onDoubleClick={() => setEditingTodo(todo.id)}>
                                <input
                                    type="checkbox"
                                    checked={todo.status === TodoStatus.COMPLETED}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {todo.id === editingTodo ?
                                    <input autoFocus className="ToDo__edit" onKeyDown={(e: any) => onEditTodo(e, todo.id)} type="text" ref={editInputRef} /> :
                                    <span>{todo.content}</span>}
                                <button
                                    className="Todo__delete"
                                    onClick={() => onDeleteTodo(todo.id)}
                                >
                                    X
                                </button>
                            </div>
                        ) : <></>
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => setShowing('ALL')}>
                        All
                    </button>
                    <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div >
    );
};

export default ToDoPage;