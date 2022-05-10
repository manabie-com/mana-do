// Library
import React, {useEffect, useReducer} from 'react';

// Organisms
import {AddTask, ListTodo} from "../../../components/organisms";

// Molecules
import {Toolbar} from "../../../components/molecules";

// Atom
import {Loading} from "../../../components/atoms";

// Action
import {
    createTodo,
    deleteAllTodos, deleteTodo,
    intiTodoList,
    intiTodoListDone,
    toggleAllTodos, updateImportantItemTodo, updateStatusShowing, updateTodo,
    updateTodoStatus
} from "./slice/actions";

// Service
import Service from "../../../service";

// Slice
import reducer, {initialState} from "./slice/reducer";

// Type
import {TodoStatus} from "../../../models/todo";

// Constant
import {TYPE_CALLBACK} from "./slice/constants";

interface ToDoListProps {

}

const TodoList:React.FC<ToDoListProps> = (props) => {
    const [{todos,showing,menuActive,isLoading}, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        (async ()=>{
            await dispatch(intiTodoList());
            const resp = await Service.getTodos();
            await dispatch(intiTodoListDone(resp || []))
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, value: string) => {
        if (e.key === 'Enter' ) {
            const resp = await Service.createTodo(value);
            if(resp){
                dispatch(createTodo(resp));
            }
        }
    }

    const onUpdateTodo = async (e: React.KeyboardEvent<HTMLInputElement>, todoId: string, value: string) => {
        const res = await Service.updateTodo(todoId, value);
        if(res.status===200){
            dispatch(updateTodo(todoId, value));
        }
    }


    const onUpdateTodoStatus = async (checked:boolean, todoId: any) => {
        const resp = await Service.updateStatusTodo(todoId, checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE)
        if(resp.status === 200){
           dispatch(updateTodoStatus(todoId, checked))
        }
    }

    const onToggleAllTodo = (checked: boolean) => {
        dispatch(toggleAllTodos(checked))
    }

    const onDeleteAllTodo = () => {
        dispatch(deleteAllTodos());
    }

    const onDeleteItemTodo = async (todoId:string) => {
        const res = await Service.removeTodo(todoId)
        if(res.status === 200){
            dispatch(deleteTodo(todoId))
        }
    }

    const onUpdateStatusShowing = (status: TodoStatus) => {
        dispatch(updateStatusShowing(status))
    }

    const onUpdateIsImportant = (todoId:string, isImportant: boolean) => {
        dispatch(updateImportantItemTodo(todoId, isImportant))
    }

    const callback = (type:string, value?:any) => {
        switch (type) {
            case TYPE_CALLBACK.UPDATE_SHOWING_STATUS:
                return onUpdateStatusShowing(value)

            case TYPE_CALLBACK.DELETE_ALL:
                return onDeleteAllTodo()

            case TYPE_CALLBACK.DELETE_ITEM_BY_ID:
                return onDeleteItemTodo(value)

            case TYPE_CALLBACK.CREATE_TODO:
                return onCreateTodo(value.e, value.value)

            case TYPE_CALLBACK.TOGGLE_ALL_TODO:
                return onToggleAllTodo(value)

            case TYPE_CALLBACK.UPDATE_STATUS_BY_ID:
                return onUpdateTodoStatus(value.checked , value.todoId)

            case TYPE_CALLBACK.UPDATE_IS_IMPORTANT:
                return onUpdateIsImportant(value.todoId, value.isImportant)

            case TYPE_CALLBACK.UPDATE_TODO:
                return onUpdateTodo(value.e ,value.todoId, value.value)

            default:
                return

        }
    }

    return (
        <>
            <div className="bar bar__left">
                <Toolbar callback={callback} menuActive={menuActive}/>
            </div>
            <div className="bar bar__right">
                <Loading isLoading={isLoading}/>
                <ListTodo callback={callback} todos={todos} showing={showing}/>
                <AddTask callback={callback} typeCallback={TYPE_CALLBACK.CREATE_TODO} isShowCheckAll={todos.length > 0}/>
            </div>
        </>
    )
}

export default  TodoList