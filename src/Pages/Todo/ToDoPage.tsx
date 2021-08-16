import React, { useEffect, useReducer, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import reducer from '../../store/reducer';
import initialState from '../../store/initState';
import {
    setTodos,
    createTodo,
    toggleAllTodos,
    updateTodoStatus,
    updateTodoContent
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import Toolbar from './Toolbar';
import TodoItems from './TodoItem'
import CreateTodo from './CreateTodo';
import HeaderBar from '../../component/HeaderBar/HeaderBar';
import Notification from '../../component/Notification/Notification';
import PopUp from '../../component/Popup/PopUp';
import UserMenu from '../../component/UserMenu/UserMenu';
import ButtonChangeLang from '../../component/ButtonChangeLang/ButtonChangeLang';
type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { todos = [] } = state // get todo list at store
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
    const [noti, setNoti] = useState({
        status: false,
        type: '',
        content: ''
    })
    // state to save current todo have been user selected
    const [currentTodo, setCurrentTodo] = useState({
        id: '',
        content: '',
        status: ''
    })
    // state of popup 
    const [popupDelete, setPopupDelete] = useState({
        showPopup: false,
        title: 'delete_todos',
        content: 'confirm_delete_todos',
    })
    const [popupEdit, setPopupEdit] = useState({
        showPopup: false,
        title: '',
        content: '',
    })
    const [popupSignOut, setPopupSignOut] = useState({
        showPopup: false,
        title: 'sign_out',
        content: 'do_you_want_sign_out',
    })
    ///////
    useEffect(() => {
        (async () => {
            await Service.getTodos()
                .then(resp => {
                    dispatch(setTodos(resp || []));
                })
                .catch(error => {
                    //pushnotification
                })
        })()
    }, [])
    const onCreateTodoApi = async (value: any, cb: any) => {
        if (!value) {
            setNoti((prev: any) => ({
                ...prev,
                status: true,
                type: 'alert',
                content: 'todo_name_empty'
            }))
            hideNotification()
            return;
        }
        await Service.createTodo(value)
            .then((resp: any) => {
                dispatch(createTodo(resp || []));
                setNoti((prev: any) => ({
                    ...prev,
                    status: true,
                    type: 'success',
                    content: 'add_todo_success'
                }))
                hideNotification()
                cb && cb()
            })
            .catch((error: any) => {
                //pushnotification
            })
    }

    const onUpdateTodoStatus = (e: boolean, todoId: string) => {
        /**
         * fake api update 
         */
        let querryparam = TodoStatus.ACTIVE
        e ? querryparam = TodoStatus.COMPLETED : querryparam = TodoStatus.ACTIVE;
        callApiUpdateTodo("status", querryparam, todoId)
    }
    const onUpdateTodoContent = (content: string, todoId: string, fnCallback: any) => {
        setCurrentTodo((prev: any) => ({
            ...prev,
            id: todoId,
            content: content,
            status: ''
        }))
        setPopupEdit((prev: any) => ({
            ...prev,
            showPopup: true,
            title: 'update_todo',
            content: 'confirm_update_todo',
        }))
    }
    const callApiUpdateTodo = async (field: any, value: any, id: any) => {
        await Service.updateTodo(field, value, id)
            .then((resp: any) => {
                switch (field) {
                    case "content":
                        dispatch(updateTodoContent(id, value))
                        break;
                    case "status":
                        dispatch(updateTodoStatus(id, value === TodoStatus.COMPLETED))
                        break;
                    default:
                        break;
                }
            })
            .catch((error: any) => {
            })
    }
    const onToggleAllTodo = (e: boolean) => {
        updateAllTodo(e)
    }
    const updateAllTodo = async (status: boolean) => {
        await Service.updateAllTodo(status)
            .then((resp: any) => {
                dispatch(toggleAllTodos(status))
            })
            .catch((error: any) => {
                //pushnotification
            })
    }
    const onDeleteAllTodo = async () => {
        if (!showTodos || (showTodos && !showTodos.length)) {
            return;
        }
        setCurrentTodo((prev: any) => ({
            ...prev,
            id: ''
        }))
        setPopupDelete((prev: any) => ({
            ...prev,
            showPopup: true,
            title: 'delete_todos_all',
            content: 'confirm_delete_todos_all',
        }))
    }
    const hideNotification = () => {
        setTimeout(() => {
            setNoti((prev: any) => ({
                ...prev,
                status: false,
                type: '',
                content: ''
            }))
        }, 3000)
    }
    const callApiDeleteAll = async () => {
        await Service.deleteAllTodo()
            .then((resp: any) => {
                dispatch(setTodos([]));
                setPopupDelete((prev: any) => ({
                    ...prev,
                    showPopup: false
                }))
                setNoti((prev: any) => ({
                    ...prev,
                    status: true,
                    type: 'success',
                    content: 'success_delete_all'
                }))
                hideNotification()
            })
            .catch((error: any) => {
                // console.log("error")
                //pushnotification
            })
    }
    const onClickDeleteTodo = (id: string) => {
        setCurrentTodo((prev: any) => ({
            ...prev,
            id: id
        }))
        setPopupDelete((prev: any) => ({
            ...prev,
            showPopup: true,
            title: 'delete_todos',
            content: 'confirm_delete_todos',
        }))
    }
    const callApiDeleteSingleTodo = async () => {
        await Service.deleteTodo(currentTodo.id)
            .then((resp: any) => {
                dispatch(setTodos(resp || []));
                setNoti((prev: any) => ({
                    ...prev,
                    status: true,
                    type: 'success',
                    content: 'success_delete'
                }))
                hideNotification()
            })
            .catch((error: any) => {
                //pushnotification
            })
    }
    const showTodos = todos.filter((todo) => { //checking todo is empty or not
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    })
    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
    return (
        <>
            <Notification noti={noti} />
            <UserMenu
                onClickSignOut={() => {
                    setPopupSignOut((prev: any) => ({
                        ...prev,
                        showPopup: true
                    }))
                }}
            />
            <ButtonChangeLang />
            <PopUp // confirm delete all
                popupInfo={popupDelete}
                type='alert'
                iconPath="/img/delete.svg"
                cbConfirm={() => {
                    currentTodo.id ? callApiDeleteSingleTodo() : callApiDeleteAll()
                    setPopupDelete((prev: any) => ({
                        ...prev,
                        showPopup: false
                    }))
                }}
                cbCancel={() => {
                    setPopupDelete((prev: any) => ({
                        ...prev,
                        showPopup: false
                    }))
                }}
            />
            <PopUp // confirm edit content
                popupInfo={popupEdit}
                type='alert'
                iconPath="/img/edit.svg"
                cbConfirm={() => {
                    callApiUpdateTodo("content", currentTodo.content, currentTodo.id)
                    setPopupEdit((prev: any) => ({
                        ...prev,
                        showPopup: false
                    }))
                }}
                cbCancel={() => {
                    setPopupEdit((prev: any) => ({
                        ...prev,
                        showPopup: false
                    }))
                }}
            />
            <PopUp // confirm sign out
                iconPath="/img/signout.svg"
                popupInfo={popupSignOut}
                type='alert'
                cbConfirm={() => {
                    localStorage.setItem("token", "");
                    localStorage.setItem("loginTime", "");
                    localStorage.setItem("username", "");
                    history.push('/')
                }}
                cbCancel={() => {
                    setPopupSignOut((prev: any) => ({
                        ...prev,
                        showPopup: false
                    }))
                }}
            />
            <div className="ToDo__container">
                <HeaderBar />
                {
                    /**
                     * Split CreateTodo to a component
                     */
                }
                <CreateTodo
                    onCreateTodoApi={onCreateTodoApi}
                />
                {
                    /**
                     * Split toolbar to a component
                     */
                }
                {todos && todos.length ? <Toolbar
                    showTodos={showTodos}
                    showing={showing}
                    todos={todos}
                    activeTodos={activeTodos === 0}
                    onToggleAllTodo={onToggleAllTodo}
                    onClickTab={setShowing}
                    listStatus={[
                        {
                            value: 'ALL',
                            label: 'all'
                        },
                        {
                            value: TodoStatus.ACTIVE,
                            label: 'active'
                        },
                        {
                            value: TodoStatus.COMPLETED,
                            label: 'completed'
                        },
                    ]}
                    onDeleteAllTodo={onDeleteAllTodo}
                /> : null}
                <div className="ToDo__list ff-scroll-bar">
                    {
                        showTodos.map((todo, index) => {
                            return <TodoItems
                                key={index}
                                onClickDeleteTodo={onClickDeleteTodo}
                                onUpdateTodoStatus={onUpdateTodoStatus}
                                onUpdateTodoContent={onUpdateTodoContent}
                                todo={todo}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default ToDoPage;