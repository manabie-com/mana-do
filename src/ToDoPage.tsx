import React, {useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import {Todo, TodoStatus} from './models/todo';
import {isTodoCompleted} from "./utils";

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [editing, setEditing] = useState({id: '', text: ''});
    const createTodoRef = useRef<any>(null);
    const editTodoRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos();
            dispatch(setTodos(resp || []));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const node = createTodoRef?.current
        if (e.key === 'Enter' && node.value.length) {
            const resp = await Service.createTodo(node.value);
            console.log(resp)
            dispatch(createTodo(resp));
            node.value = "";
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }
    const onUpdateTodoContent = (todo: Todo) => {
        if (isTodoCompleted(todo)) return;
        setEditing({
            id: todo.id,
            text: todo.content
        })
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
        setShowing('ALL');
    }
    const onActionToolBar = (status: EnhanceTodoStatus) => {
        setShowing(status);
    }

    const todosFilter = todos.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const numberTodoByStatus = (status: EnhanceTodoStatus) => status === 'ALL' ? todos.length : todos.filter(todo => todo.status === status).length;
    const actionToolBarClass = (status: EnhanceTodoStatus) => status === showing ? ['Action__btn', '__active'].join(' ') : ['Action__btn'].join(' ');
    const allTodosCompleted = todos.reduce((totalTodoCompleted, todo) => isTodoCompleted(todo) ? totalTodoCompleted : totalTodoCompleted + 1, 0) === 0;

    return (
        <div className="Todo__container">
            <h1>todos</h1>
            <div className="Todo__creation">
                <input
                    ref={createTodoRef}
                    className="Todo__creation__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="Todo__list">
                {
                    todosFilter.map((todo, index) => {
                        const editable = editing?.id && editing?.id === todo.id;
                        const todoItemClassName = ['Todo__item', isTodoCompleted(todo) ? '__complete' : '', editable ? '__editing' : ''].join(' ');
                        return (
                            <div key={todo.id} className={todoItemClassName}>
                                {!editable && <input
                                    className="Todo__item__toggle"
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={e => onUpdateTodoStatus(e, todo.id)}
                                />}
                                <div className="Todo__item__content">
                                    <div className="__text" onDoubleClick={() => onUpdateTodoContent(todo)}>{todo.content}</div>
                                </div>
                                {!editable && <button title="Delete" className="Todo__item__delete" onClick={() => {
                                    console.log('Remove')
                                }}>×</button>}
                                {editable && <input
                                    ref={editTodoRef}
                                    className="__input_edit"
                                    type="text"
                                    autoFocus
                                    defaultValue={editing?.text}
                                    onChange={(e) => {
                                        setEditing({id: todo.id, text: e.target.value})
                                        console.log(editing)
                                    }}
                                    onBlur={e => {
                                        console.log('onBlur', e, index)
                                        setEditing({id: '', text: ''})
                                    }}
                                    onKeyDown={e => {
                                        console.log('onKeyDown', e, index)
                                    }}
                                />}
                            </div>
                        );
                    })
                }
                {todos.length > 0 && !(todosFilter.length > 0) &&
                <div className="__no-todos">{"no " + (showing === TodoStatus.ACTIVE ? 'active' : 'completed') + " todos..."}</div>}
            </div>
            {todos.length > 0 &&
            <div className="Todo__toolbar">
                <input type="checkbox" checked={allTodosCompleted} onChange={onToggleAllTodo} />
                <div className="Todo__toolbar__tabs">
                    <button className={actionToolBarClass('ALL')} onClick={() => onActionToolBar('ALL')}>All ({numberTodoByStatus('ALL')})</button>
                    <button className={actionToolBarClass(TodoStatus.ACTIVE)} onClick={() => onActionToolBar(TodoStatus.ACTIVE)}>Active ({numberTodoByStatus(TodoStatus.ACTIVE)})</button>
                    <button className={actionToolBarClass(TodoStatus.COMPLETED)} onClick={() => onActionToolBar(TodoStatus.COMPLETED)}>Completed ({numberTodoByStatus(TodoStatus.COMPLETED)})</button>
                </div>
                <button className="Action__btn __clear-all" onClick={onDeleteAllTodo}>Clear all todos</button>
            </div>
            }
        </div>
    );
};

export default ToDoPage;
