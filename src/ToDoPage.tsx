import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    deleteTodo
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
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' ) {
            var todoName = inputRef.current.value;
            if (todoName === '') return;
            const resp = await Service.createTodo(todoName);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
        var index = todos.findIndex(todo => todo.id === todoId);

        if (index !== -1) {
            Service.updateTodo(
                todoId, 
                todos[index].content, 
                e.target.checked?TodoStatus.COMPLETED:TodoStatus.ACTIVE);
        }

        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        todos.map(async(todo) => {
            await Service.updateTodo(
                todo.id, 
                todo.content, 
                e.target.checked?TodoStatus.COMPLETED:TodoStatus.ACTIVE)
            });
                
        dispatch(toggleAllTodos(e.target.checked));
    }

    const onDeleteAllTodo = async () => {
        todos.map(async(todo) => await Service.deleteTodo(todo.id));
        dispatch(deleteAllTodos());
    }

    const onDeleteTodo = async (todoId: any) => {
        await Service.deleteTodo(todoId);
        dispatch(deleteTodo(todoId));
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
                    todos.filter(todo => showing === 'ALL'?true:(showing===todo.status))
                    .map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={todo.status === TodoStatus.COMPLETED}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
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
                        checked={todos.filter(todo=>todo.status===TodoStatus.ACTIVE).length===0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button 
                        className={`Action__btn${showing==='ALL'?'--clicked':''}`} 
                        onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button 
                        className={`Action__btn${showing===TodoStatus.ACTIVE?'--clicked':''}`} 
                        onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button 
                        className={`Action__btn${showing===TodoStatus.COMPLETED?'--clicked':''}`} 
                        onClick={()=>setShowing(TodoStatus.COMPLETED)}>
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