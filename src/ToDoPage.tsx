import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import reducer, { initialState } from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    deleteAllTodos,
    updateTodo
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';

// type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [statusTodosShow, setStatusTodosShow] = useState<string>('');
    // const [option, setOption] = useState<number>(0);
    const [todoEdit, setTodoEdit] = useState<Todo | null>(null);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            try {
                const resp = await Service.getTodos();
                console.log('resp', resp);
                dispatch(setTodos(resp));
            } catch {

            }
        })()
    }, []);


    const stateTodos = useMemo(() => {
        switch (statusTodosShow) {
            case 'ALL': return todos;
            case TodoStatus.ACTIVE: return todos.filter(todo => todo.status === TodoStatus.ACTIVE)
            case TodoStatus.COMPLETED: return todos.filter(todo => todo.status === TodoStatus.COMPLETED)
            default: return todos
        }
    }, [statusTodosShow, todos]);

    const stateTodosActive = useMemo(() => {
        return todos.filter(todo => todo.status === TodoStatus.ACTIVE)
    }, [todos]);

    const stateTodosCompleted = useMemo(() => {
        return todos.filter(todo => todo.status === TodoStatus.COMPLETED)
    }, [todos]);

    const onCreateTodo = useCallback((content: string) => {
        (async () => {
            try {
                const resp = await Service.createTodo(content);
                dispatch(createTodo(resp));
                
            } catch {

            }
        })();
        inputRef.current.value = "";
        setStatusTodosShow(TodoStatus.ACTIVE)
    }, []);

    const onSelectTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodo({ checked: e.target.checked }, todoId))

    }, []);

    const onUpdateTodoContent = (newContent: string, todoId: any) => {
        dispatch(updateTodo({ content: newContent }, todoId));
        inputRef.current.value = "";
        setTodoEdit(null)
    }

    const onEditTodo = useCallback((todo: Todo) => {
        setTodoEdit(todo);
        inputRef.current.value = todo.content
        inputRef.current.focus()
    }, [inputRef]);

    const onSelectAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        stateTodos.forEach(i => {
            onSelectTodo(e, i.id);
        })
    }

    const onDeleteTodo = (todoID: string) => {
        dispatch(deleteTodo(todoID))
    };


    const onChangeStatusTodos = useCallback(((status: string) => {
        stateTodos.forEach(i => {
            console.log('status', 'i', status, i);
            i.checked && dispatch(updateTodo({ status }, i.id));
        })
    }), [stateTodos]);

    const onSelectOption = useCallback((e) => {
        switch (e.target.value) {
            case "DELETE":
                console.log('onDeleteTodos');
                stateTodos.forEach(i => {
                    console.log('i.checked', i.checked);
        
                    i.checked && onDeleteTodo(i.id)
                });
                break;
            case "ACTIVE": onChangeStatusTodos(TodoStatus.ACTIVE);
                break;
            case "COMPLETED": onChangeStatusTodos(TodoStatus.COMPLETED);
                break;
            default: break;
        }

    }, [onChangeStatusTodos, stateTodos]);

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onSaveAllTodo = () => {
        (async () => {
            try {
                await Service.saveTodos(todos);
            } catch {

            }
        })()
    }

    const onkeydown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (todoEdit) {
                onUpdateTodoContent(inputRef.current.value, todoEdit.id)
            } else {
                onCreateTodo(inputRef.current.value)
            }
        }
    }

    useEffect(() => {
        stateTodos.forEach(i => {
            dispatch(updateTodo({ checked: false }, i.id));
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusTodosShow]);

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onkeydown}
                    onBlur={() => {
                        inputRef.current.value = "";
                        setTodoEdit(null)
                    }}
                />
            </div>
            {stateTodos.length > 0 && (
                <div className="Todo__toolbar">
                    <input
                        type="checkbox"
                        onChange={(e) => onSelectAllTodo(e)}
                    />

                    <select value={0} disabled={stateTodos.filter(i => i.checked).length === 0} onChange={(e) => onSelectOption(e)}>
                        <option disabled value={0}> -- select an option -- </option>
                        <option value={"DELETE"}>Delete</option>
                        <option value={"ACTIVE"}>Active</option>
                        <option value={"COMPLETED"}>Completed</option>
                        <option value={4}>...</option>
                    </select>
                </div>
            )}
            <div className="ToDo__list">
                {
                    stateTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={todo.checked}
                                    onChange={(e) => onSelectTodo(e, todo.id)}
                                />
                                <span
                                    onDoubleClick={() => onEditTodo(todo)}
                                >{todo.content}</span>
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
                <div className="Todo__tabs">
                    <button className="Action__btn" onClick={() => setStatusTodosShow('ALL')}>
                        All ({todos.length})
                    </button>
                    <button className="Action__btn" onClick={() => setStatusTodosShow(TodoStatus.ACTIVE)}>
                        Active ({stateTodosActive.length})
                    </button>
                    <button className="Action__btn" onClick={() => setStatusTodosShow(TodoStatus.COMPLETED)}>
                        Completed ({stateTodosCompleted.length})
                    </button>
                </div>
                <button className="Action__btn" onClick={onSaveAllTodo}>
                    Save all todos
                </button>
                <button className="Action__btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;