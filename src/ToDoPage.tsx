import React, { useEffect, useReducer, useRef, useState, useCallback } from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
    updateTodo
} from './store/actions';
import Service from './service';
import { TodoStatus } from './models/todo';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing,] = useState<EnhanceTodoStatus>('ALL');
    const [currentId, setCurrentId] = useState<string>('');
    const inputRef = useRef<any>(null);
    const inputUpdateRef = useRef<any>(null);

    useEffect(()=>{
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [])

   

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            // Rest giá trị input về ''
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {   
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (toggle:boolean) => {
        dispatch(toggleAllTodos(toggle))
    }

    const onDeleteTodo = (todoId: any) => {
        dispatch(deleteTodo(todoId))
    };

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
        
    }
    const onUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        if (e.key === 'Enter') {
            dispatch(updateTodo(todoId, inputUpdateRef.current.value));
            setCurrentId('');
        }
    };
    // Sử dụng useCallback để giữ lại được curentId sau mỗi lần re-render
    const handleMouseDown =useCallback( (e: any) => {
      
        if (inputUpdateRef.current && !inputUpdateRef.current.contains(e.target)) {
            dispatch(updateTodo(currentId, inputUpdateRef.current.value));
            setCurrentId('');

        }
        
    },[currentId]);
   // Hook này sẽ chạy sau khi lắng nghe event 'click', sau đó thực thi hàm handleMouseDown
    useEffect(() => {
        document.addEventListener("click", handleMouseDown, true);
        return () => {
            document.removeEventListener("click", handleMouseDown, true);
        };
    }, [handleMouseDown]);

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
                    todos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={showing === 'ALL' ? todo.status === TodoStatus.COMPLETED : true}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {todo.id === currentId ? <input className="Todo__input Todo__updateInput"
                                    defaultValue={todo.content} ref={inputUpdateRef} onKeyDown={(e) => onUpdateTodo(e, todo.id)} onMouseDown={handleMouseDown}

                                /> : <span onDoubleClick={() => setCurrentId(todo.id)}>{todo.content}</span>}
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
                        onChange={(e) => onToggleAllTodo(e.target.checked)}
                    /> : <div />
                }
                <div className="Todo__tabs">
                    <button className="Action__btn">
                        All
                    </button>
                    <button className="Action__btn" onClick={() => onToggleAllTodo(false)}>
                        Active
                    </button>
                    <button className="Action__btn" onClick={() => onToggleAllTodo(true)}>
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