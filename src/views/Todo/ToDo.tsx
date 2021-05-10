import React, { useEffect, useReducer, useRef, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from '../../store/reducer';

import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
} from '../../store/actions';
import Service from '../../service';
import {TodoStatus} from '../../models/todo';
import {isTodoCompleted} from '../../utils';
import TodoItem from '../../components/ToDoItem'
import './style.css'

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) history.push('/');
    }, [ history ])

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();

            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                dispatch(createTodo(resp));
                inputRef.current.value = '';
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    const handleStatusChange = (status: boolean, todoId: string) => {
        dispatch(updateTodoStatus(todoId, status))
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

    const handleUpdateContent = (todoId:string, newContent: string) => {
        dispatch(updateTodoContent(todoId, newContent))
    }

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
                            <TodoItem
                                key={index}
                                content={todo.content}
                                checked={isTodoCompleted(todo)}
                                onChangeStatus={(status: boolean) => handleStatusChange(status, todo.id)}
                                onDelete={() => dispatch(deleteTodo(todo.id))}
                                onUpdateContent={(newContent) => handleUpdateContent(todo.id, newContent)}
                            />
                        );
                    })
                }
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
