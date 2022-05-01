import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo,
} from './store/actions';
import Service from './service';
import {TodoStatus} from './models/todo';

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
    }, []);

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                // prevent add new todo if input value is empty
        if (e.key === 'Enter' && inputRef.current.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = ""; // clear input value
        }
    };

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => dispatch(updateTodoStatus(todoId, e.target.checked));

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(toggleAllTodos(e.target.checked));

    const onDeleteAllTodo = () => dispatch(deleteAllTodos());

    const onDeleteTodoById = (todiId: any) => dispatch(deleteTodo(todiId));

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
            <small className='Todo__note'>Press ENTER to add your TODO</small>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
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
            <div className="ToDo__list">
                {
                    todos.map((todo, index) =>
                        <div key={index} className="ToDo__item">
                            <input
                                type="checkbox"
                                checked={todo.status === TodoStatus.COMPLETED}
                                onChange={e => onUpdateTodoStatus(e, todo.id)}
                            />
                            <span className={`todo__${todo.status}`}>{todo.content}</span>
                            <button
                                className="Todo__delete"
                                onClick={() => onDeleteTodoById(todo.id)}
                            >
                                X
                            </button>
                        </div>
                    )
                }
                {
                    todos.length === 0
                    && <div className='toDo__message'>
                            <h4>MANABIE TO DO</h4>
                            <p>Free up your mental space, gives you focus, from work to play.</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default ToDoPage;