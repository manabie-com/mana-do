import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';
import { saveToLocalStorage } from './utils/localStorage';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
      saveToLocalStorage(todos);
    }, [todos])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));

            // It'd be a better user experience if we clear the input every time a to-do is created.
            // So users don't have to delete the old input value before create a new one.
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onEditTodo = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.currentTarget.contentEditable = 'true';
      e.currentTarget.focus();
    }

    const onBlurTodo = (e: React.FocusEvent<HTMLSpanElement>, originalContent: string) => {
      e.currentTarget.contentEditable = 'false';
      e.currentTarget.innerText = originalContent;
    }

    const onUpdateTodo = (e: React.KeyboardEvent<HTMLSpanElement>, id: string) => {
      if (e.key === 'Enter') {
        dispatch(updateTodoContent(id, e.currentTarget.innerText));
        e.currentTarget.contentEditable = 'false';
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
                  // Using array index as the key is unreliable. That can cause strange behaviors.
                  // https://reactjs.org/docs/lists-and-keys.html#keys
                    todos.map((todo) => {
                        return (
                            <div key={todo.id} className="ToDo__item">
                                <input
                                    aria-label="todo-item-checkbox"
                                    type="checkbox"
                                    checked={TodoStatus.COMPLETED === todo.status}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span
                                  onDoubleClick={onEditTodo}
                                  onBlur={e => onBlurTodo(e, todo.content)}
                                  onKeyDown={e => onUpdateTodo(e, todo.id)}
                                  >{todo.content}</span>
                                <button
                                    className="Todo__delete"
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
                        aria-label="toggle-all-todos"
                        type="checkbox"
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className="Action__btn">
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