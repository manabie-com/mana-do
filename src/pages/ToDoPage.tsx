import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBorderAll, faTrash, faSpinner, faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import reducer, {AppState, initialState} from '../store/reducer';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus
} from '../store/actions';
import Service from '../service';
import {TodoStatus} from '../models/todo';
import {isTodoCompleted} from '../utils';
import {TodoCreation} from "../components/TodoCreation";
import {TodoList} from "../components/TodoList";
import {Button} from "../components/Button";
import {
    createTodoAction,
    deleteAllTodosAction, deleteTodoAction, editTodoAction,
    loadTodosAction, selectTodoEditAction, syncTodosToLocal,
    toggleAllTodosAction,
    updateTodoStatusAction
} from "../actions/todo";
import {TodoPageContext} from "../context/todo";
import {TodoBar, TodoToolBar} from "../components/TodoBar";

type EnhanceTodoStatus = TodoStatus | 'ALL';


const ToDoPage = ({history}: RouteComponentProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [showToolbar, setShowToolbar] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const todos = useMemo(() => (state as AppState).todos, [state]);
    const selectedItem = useMemo(() => (state as AppState).editTodo, [state])
    const loaded = useMemo(() => (state as AppState).loaded, [state]);
    useEffect(() => {
        if (!loaded) {
            loadTodosAction(dispatch)()
        }
    }, [loaded])
    useEffect(() => {
        if (loaded) {
            syncTodosToLocal(todos)
        }
    }, [todos, loaded])

    const onCreateTodo = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current) {
            try {
                createTodoAction(dispatch)(inputRef.current.value)
            } catch (e) {
                if (e.response.status === 401) {
                    history.push('/')
                }
            } finally {
                inputRef.current.value = '';
            }
        }
    }, [])

    const onUpdateTodoStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        updateTodoStatusAction(dispatch)(todoId, e.target.checked)
    }, [])

    const onToggleAllTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        toggleAllTodosAction(dispatch)(e.target.checked)
    }, [])

    const onDeleteTodo = useCallback((id: string) => {
        deleteTodoAction(dispatch)(id)
    }, [])

    const onDeleteAllTodo = useCallback(() => {
        deleteAllTodosAction(dispatch)()
    }, [])
    // edit feature
    const onSelectTodoEdit = useCallback((id: string) => {
        selectTodoEditAction(dispatch)(id)
    }, [])
    const onEditTodo = useCallback((id: string, value: string) => {
        editTodoAction(dispatch)(id, value)
    }, [])

    const onShowItems = useCallback((status: EnhanceTodoStatus) => setShowing(status), [showing]);
    const onToggleBar = useCallback(() => setShowToolbar(!showToolbar), [showToolbar]);
    const filterByStatus = (status: EnhanceTodoStatus) => todos.filter(todo => status === 'ALL' || status === todo.status)

    const showTodos = filterByStatus(showing)

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);

    return (<TodoPageContext.Provider value={{selectedItem}}>
            <div className={["ToDo__container", !showToolbar ? 'close-toolbar' : ''].join(' ')}>
                <div className={"ToDo__main"}>
                    <TodoBar onToggleBar={onToggleBar}/>
                    <h2 className={"ToDo_title"}>What need to be done?</h2>
                    <TodoCreation onKeyDown={onCreateTodo} ref={inputRef}/>
                    <TodoList todos={showTodos} updateItem={onUpdateTodoStatus}
                              deleteItem={onDeleteTodo} selectItemEdit={onSelectTodoEdit} editItem={onEditTodo}/>
                </div>

                <TodoToolBar onShowItems={onShowItems}/>
                {todos.length > 0 ?
                    <div className="Todo__check-all">
                        <input
                            type="checkbox"

                            checked={activeTodos === 0}
                            onChange={onToggleAllTodo}
                        />
                        Complete all tasks
                    </div> : <div/>
                }
                <Button text={'Clear all todos'} icon={<FontAwesomeIcon icon={faTrash} className={'Todo__icon'}/>}
                        className="Action__btn Todo__clear" onClick={onDeleteAllTodo}/>
            </div>
        </TodoPageContext.Provider>
    );
};

export default ToDoPage;