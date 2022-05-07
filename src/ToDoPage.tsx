import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    editTodo,
    editTodoText,
} from './store/actions';
import Service from './service';
import { Todo, TodoStatus } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [filteredTodos, setFilterTodos] = useState([] as Todo[]);
    const [isAllTodoCompleted, setAllTodosCompleted] = useState(false);
    const [newTodoContent, setNewTodoContent] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipID, setTooltipID] = useState<any | null>(null);
    const editInputRef = useRef<any>(null);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        // get todos from localstorage
        const resp = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]

        resp.map((todo) => {
            todo.is_editing = false;
            return todo;
        });
        dispatch(setTodos(resp || []));
    }, []);
    
    useEffect(() => {
        // save todos in local storage
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    
    useEffect(() => {
        setFilterTodos(() => {
          if (showing === 'ALL') return todos;
          return todos.filter((todo) => todo.status === showing);
        });

        // check "all checkbox" if all is active
        const index = todos.findIndex((todo) => todo.status === TodoStatus.ACTIVE);
        setAllTodosCompleted(index === -1);
    }, [todos, showing]);

    // create todo
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    // update, edit
    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }
    const onUpdateTodoContent = (
        e: React.KeyboardEvent<HTMLInputElement>,
        todoId: string
      ) => {
        if (e.key === 'Enter') {
          if (newTodoContent) dispatch(editTodoText(todoId, newTodoContent));
          dispatch(editTodo(todoId, false));
          setNewTodoContent('');
        }
    };
    const onShowEditTodo = (todoId: string, content: string) => {
        setNewTodoContent(content);
        dispatch(editTodo(todoId, true));
    };

    // check all
    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    // delete
    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId));
    };
    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    // tooltip
    const openTooltip = (todoId: string) => {
        setShowTooltip(true);
        setTooltipID(todoId);
    }
    const closeTooltip = () => {
        setShowTooltip(false);
        setTooltipID(null);
    }

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What needs to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    filteredTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={todo.status === TodoStatus.COMPLETED}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {
                                    todo.isEditing ? (
                                    <input
                                        ref={editInputRef}
                                        className="Todo__edit"
                                        value={newTodoContent}
                                        data-id={todo.id}
                                        onChange={(e) => setNewTodoContent(e.target.value)}
                                        onKeyDown={(e) => onUpdateTodoContent(e, todo.id)}
                                    />
                                    ) : (
                                    <span onDoubleClick={() => onShowEditTodo(todo.id, todo.content)} onMouseEnter={() => openTooltip(todo.id)} onMouseLeave={closeTooltip}>{todo.content}
                                    { showTooltip && todo.id === tooltipID ?
                                        <label className="Todo__tooltip">Tip: Double click to edit</label>
                                        : null
                                    }
                                    </span>
                                    )
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
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={isAllTodoCompleted}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Btn__all" onClick={()=>setShowing(TodoStatus.ALL)}>
                        All
                    </button>
                    <button className="Btn__active" onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className="Btn__completed" onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Btn__clear" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;