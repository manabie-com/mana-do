import React, {Fragment, useEffect, useReducer, useRef, useState} from 'react';

import reducer, {initialState} from './store/reducer';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from './store/actions';
import Service from './service';
import { Todo, EnhanceTodoStatus, TodoStatus } from './models/todo';
import { deleteTodo } from './store/actions';
import { TodoItem } from './components/TodoItem';
import { Filterer } from './components/Filterer';
import { TvaDialog } from './components/TvaDialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToDoPage = () => {
    const [{todos}, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [confirmDeleteOneShowing, setConfirmDeleteOneShowing] = useState<boolean>(false);
    const [confirmDeleteAllShowing, setConfirmDeleteAllShowing] = useState<boolean>(false);
    const [focusItemId, setFocusItemId] = useState<string | null>(null);
    const inputRef = useRef<any>(null);

    useEffect(()=>{
        (async ()=>{
            const resp: Todo[] = await Service.getTodos();
            dispatch(setTodos(resp));
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current.value.length > 0) {
            const resp: Todo = await Service.createTodo(inputRef.current.value);
            dispatch(createTodo(resp));
            // if (todos.some((todo: Todo) => inputRef.current.value.trim.toLowerCase() === todo.content.toLowerCase())) {
            //     toast.error('This to do has already exist!');
            // } else {
                toast.success('To do has been created!');
                inputRef.current.value = "";
            // }
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
        toast.success(`To do has been ${e.target.checked ? 'completed': 'reactivated'}!`);
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAllTodos(e.target.checked))
        toast.success(`All to do have been ${e.target.checked ? 'completed': 'reactivated'}!`);
    }

    const onDeleteAllTodo = () => {
        if (confirmDeleteAllShowing) {
            setConfirmDeleteAllShowing(false);
        }
        dispatch(deleteAllTodos());
        toast.success('All to dos have been deleted!');
    }

    const onDeleteTodo = (todoId: string) => {
        if (confirmDeleteOneShowing) {
            setConfirmDeleteOneShowing(false);
        }
        dispatch(deleteTodo(todoId));
        toast.success('To do has been deleted!');
    }

    const showConfirmDeleteDialog = (todoId: string) => {
        setFocusItemId(todoId);
        setConfirmDeleteOneShowing(true);
    }

    const onCancel = () => {
        setFocusItemId(null);
        setConfirmDeleteOneShowing(false);
        setConfirmDeleteAllShowing(false);
    }

    const showConfirmDeleteAllDialog = () => {
        setConfirmDeleteAllShowing(true);
    }


    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input ref={inputRef} className="Todo__input" placeholder="What need to be done?" onKeyDown={onCreateTodo} />
                <div className="Sub__message">Check all completed todos</div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={1800}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            <div className="ToDo__list">
                <div className="IsShowing">
                    Showing:&nbsp;
                    { showing === 'ALL' ? ('All todos'): '' }
                    { showing === TodoStatus.ACTIVE ? ('All active todos'): '' }
                    { showing === TodoStatus.COMPLETED ? ('All completed todos'): '' }
                </div>
                {
                    todos.filter((todo: Todo) => showing === todo.status || showing === 'ALL').map((todo: Todo, index: number) => {
                        return (
                            <Fragment key={index}>
                                <TodoItem todo={todo} index={index} handleUpdate={onUpdateTodoStatus} handleDelete={() => showConfirmDeleteDialog(todo.id)} />
                            </Fragment>
                        );
                    })
                }
            <TvaDialog title='Confirming delete' isShown={confirmDeleteOneShowing} dialogStyle={{ width: '40vw', height: 'auto'}} onCancel={onCancel}>
                <div className="message">
                    This can not be undo. Are you sure you want to delete?
                </div>
                <div className="Button__group">
                    <button className='btn btn-warning' onClick={() => onDeleteTodo(focusItemId || '')}>Delete</button>
                    <button className='btn' onClick={onCancel}>Cancel</button>
                </div>
            </TvaDialog>
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <div className="Toggle__all__container">
                        <input
                            id="Toggle__all"
                            type="checkbox"
                            onChange={onToggleAllTodo}
                        />
                        <label htmlFor="Toggle__all">
                            { todos.every(todo => todo.status === TodoStatus.ACTIVE) ? 'Complete all': 'Reactivate all' }
                        </label>
                    </div> : <div/>
                }
                <Filterer setShowing={setShowing} />
                <button className="Action__btn" onClick={() => showConfirmDeleteAllDialog()} disabled={todos.length === 0}>
                    Clear all todos
                </button>
                <TvaDialog title='Confirming delete' isShown={confirmDeleteAllShowing} dialogStyle={{ width: '40vw', height: 'auto'}} onCancel={onCancel}>
                    <div className="message">
                        This can not be undo. Are you sure you want to delete all items?
                    </div>
                    <div className="Button__group">
                        <button className='btn btn-warning' onClick={onDeleteAllTodo}>Delete all</button>
                        <button className='btn' onClick={() => setConfirmDeleteAllShowing(false)}>Cancel</button>
                    </div>
                </TvaDialog>
            </div>
        </div>
    );
};

export default ToDoPage;