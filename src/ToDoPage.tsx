import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
    updateEditingStatus
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {isTodoCompleted} from './utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    /*
    * Added effect where the todo list in the local storage is also updated everytime the one in the state is updated
    */
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
        if(editInputRef.current){
            editInputRef.current.focus();
        }
    }, [todos])

    /*
    * Revised condition since even empty objects always result in a truthy value.
    * Not to mention the original call did not access the correct property of the object (value)
    */
    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current?.value) {
            const resp = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            inputRef.current.value = '';
        }
    }

    /*
    * Added handlers for updating todo list item content on keypress
    */
    const onUpdateContentKey = async (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
        if (e.key === 'Enter' && editInputRef.current?.value) {
            dispatch(updateTodoContent(todo.id, editInputRef.current?.value || ''));
            dispatch(updateEditingStatus(todo.id, false))
            editInputRef.current.value = '';
        }
    }

    /*
    * Added handlers for updating editing status on input blur to discard changes
    */
    const onUpdateContentBlur = async (e: React.FocusEvent<HTMLInputElement>, todo: Todo) => {
        if(editInputRef.current?.value){
            dispatch(updateEditingStatus(todo.id, false))
            editInputRef.current.value = '';
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    /*
    * Added handlers for updating editing status on double click
    */
    const onUpdateEditingStatus = (e: React.MouseEvent<HTMLSpanElement>, todo: Todo) => {
        dispatch(updateEditingStatus(todo.id, !todo.isBeingEdited))
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

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    const resolveBtnClasses = (type:string) => {
        const actionBtn = 'Action__btn';
        if(type === showing) return `${actionBtn} active`;
        return actionBtn;
    }

    return (
        <div className="ToDo__container">
            <h1>Things To Do</h1>
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What needs to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button className={resolveBtnClasses('ALL')} onClick={()=>setShowing('ALL')}>
                        All
                    </button>
                    <button className={resolveBtnClasses('ACTIVE')} onClick={()=>setShowing(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button className={resolveBtnClasses('COMPLETED')} onClick={()=>setShowing(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn clear-all" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
            <div className="ToDo__list">
                {
                    showTodos.length ?
                    showTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                <span className='Todo__wrapper'>
                                    {
                                        todo.isBeingEdited?
                                        <input
                                            ref={editInputRef}
                                            className="Todo__input"
                                            defaultValue={todo.content}
                                            onKeyDown={(event)=> {onUpdateContentKey(event, todo)}}
                                            onBlur={(event)=> {onUpdateContentBlur(event, todo)}}
                                        />
                                        : 
                                        <span 
                                            className="Todo__content"
                                            onDoubleClick={(event)=> {onUpdateEditingStatus(event, todo)}}
                                        >
                                            {todo.content}
                                        </span>
                                    }
                                </span>
                                <button
                                    className="Todo__delete"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                    :
                    <div className='ToDo__empty'>
                        Sorry, but there are no items to show :(
                    </div>
                }
            </div>
        </div>
    );
};

export default ToDoPage;