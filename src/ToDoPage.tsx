import React, {useEffect, useReducer, useRef, useState} from 'react';
import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    editTodo
} from './store/actions';
import Service from './service';
import {TodoStatus, Todo} from './models/todo';
import {isTodoCompleted} from './utils';
import { EditTodo } from './EditTodo';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const [err, setErr] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value.length > 0 ? setErr(false) : setErr(true)
    }

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            if(inputRef.current.value.length > 0) {

                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
            } else {
                setErr(true)
            }
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

    const onEditTodo = (todo: Todo, content: string) => {
        dispatch(editTodo(todo.id, content));
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
            <div className="ToDo__title">To do App</div>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                    onChange={onChange}
                />
            </div>
                {
                    err && 
                    <div style={{
                        color: 'red', 
                        marginTop: '15px', 
                        textAlign: 'left',
                        fontSize: '13px'}}
                    >*Please enter content here</div>
                }
            <div className="ToDo__list">
                {
                    showTodos.length > 0 ? (
                        showTodos.map((todo, index) => {
                            return (
                                <div key={index} className="ToDo__item">
                                    <input
                                        type="checkbox"
                                        checked={isTodoCompleted(todo)}
                                        onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                        className="Todo__checkbox"
                                    />
    
                                    <EditTodo todo={todo} onEditTodo={onEditTodo} />
                                    
                                    <button
                                        className="Todo__delete"
                                        onClick={() => dispatch(deleteTodo(todo.id))}
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="Todo__empty">Empty list task</div>
                    )
                    
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                        className="Todo__checkbox"
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button 
                        className={`${showing === 'ALL' ? 'Active__btn' : ''} Action__btn `} 
                        onClick={()=>setShowing('ALL')}
                    >
                        All
                    </button>
                    <button 
                        className={`${showing === TodoStatus.ACTIVE ? 'Active__btn' : ''} Action__btn `} 
                        onClick={()=>setShowing(TodoStatus.ACTIVE)}
                    >
                        Active
                    </button>
                    <button 
                        className={`${showing === TodoStatus.COMPLETED ? 'Active__btn' : ''} Action__btn `} 
                        onClick={()=>setShowing(TodoStatus.COMPLETED)}
                    >
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