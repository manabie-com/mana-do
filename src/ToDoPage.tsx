import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodo
} from './store/actions';
import Service from './service';
import {TodoStatus, LocalKey} from './models/todo';
import {isTodoCompleted, isTodoActive, setLocalStorage, getLocalStorage} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState, () => ({
      todos: getLocalStorage(LocalKey.TODO_LIST)
    }));
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editItem, setEditItem] = useState<string>('');
    const [editingVal, setEditingVal] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            console.log('call 1');
            
            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
      setLocalStorage(LocalKey.TODO_LIST, JSON.stringify(todos));
    }, [todos])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
      if (e.key === 'Enter' && editingVal) {
        const todo = await Service.updateTodo(todoId, editingVal);
        dispatch(updateTodo(todo));
        setEditItem('');
      }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
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

    // Reason: easier to read, understand.
    const isActive = todos.some((todo) => isTodoActive(todo));

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyPress={onCreateTodo}
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
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                { editItem === todo.id ?
                                  <input
                                    type="text"
                                    autoFocus={true}
                                    className="ToDo__message"
                                    defaultValue={todo.content}
                                    onChange={(e) => setEditingVal(e.target.value)}
                                    onKeyPress={(e) => onUpdateTodo(e, todo.id)}
                                    onBlur={() => setEditItem('')}
                                  /> :
                                  <span onDoubleClick={() => setEditItem(todo.id)}>{todo.content}</span>
                                }
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
                        checked={!isActive}
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