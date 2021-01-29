import React, {useEffect, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import reducer, {initialState} from '../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent
} from '../store/actions';
import Service from '../service';
import {TodoStatus} from '../models/todo';
import {isTodoCompleted} from '../utils';

import {
    ToDoItem,
    TodoToolbar
} from './components'
type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        (async ()=>{
            console.log('alo')
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
            
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            // create todo method still run even though the content on the input is empty
            // so i add this selection statement to filter that case
            if(inputRef.current.value.trim() !== ''){
                try {
                    const resp = await Service.createTodo(inputRef.current.value);
                    dispatch(createTodo(resp));
                    inputRef.current.value = '';
                    // I found an error that if user complete create a todo and the value from input is reset to '', 
                    // but if input field still have a focus status, in the next time, createTodo will dispacth twice
                    // so that i add blur action after each createTodo 
                    inputRef.current.blur()
                } catch (e) {
                    if (e.response.status === 401) {
                        history.push('/')
                    }
                }
            }
            return
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        console.log(e.target.checked)
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

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    style={{boxShadow:'none', border: 'none', backgroundColor: '#f0f0f0', fontSize:'21px'}}
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                    showTodos.map((todo, index) => {
                        return (
                            <ToDoItem   key={index} 
                                        content={todo.content}
                                        deleteTodoEvent = {() => dispatch(deleteTodo(todo.id))}
                                        onUpdateTodoStatusEvent = {(e: React.ChangeEvent<HTMLInputElement>) => onUpdateTodoStatus(e, todo.id)}
                                        updateTodoContentEvent = {(content: string) => {dispatch(updateTodoContent(todo.id, content))}}
                                        isTodoCompletedEvent={isTodoCompleted(todo)}
                                        todo={todo} />
                        );
                    })
                }
            </div>
            {/* <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
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
            </div> */}
            <TodoToolbar    onToggleAllTodoEvent={onToggleAllTodo}
                            onShowingAllEvent={()=>setShowing('ALL')}
                            onShowingActiveEvent={()=>setShowing(TodoStatus.ACTIVE)}
                            onShowingCompleteEvent={()=>setShowing(TodoStatus.COMPLETED)}
                            onDeleteAllTodoEvent={onDeleteAllTodo}
                            todos={todos}
                            activeTodos={activeTodos}
                            />
        </div>
    );
};

export default ToDoPage;