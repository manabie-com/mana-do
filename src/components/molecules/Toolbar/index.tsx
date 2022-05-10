// Library
import React from 'react';

// Atoms
import {ItemSiderBar} from "../../atoms/ItemSiderBar";

// type
import {TodoStatus} from "../../../models/todo";

// Constants
import {TYPE_CALLBACK} from "../../../Modules/Home/ToDoList/slice/constants";

export enum MenuActive {
    ALL= "ALL",
    ACTIVE= "ACTIVE",
    COMPLETED= "COMPLETED",
    CLEAR= "CLEAR",
    IMPORTANT= "IMPORTANT"
}

interface ToolbarProps {
    callback: (type:string, value?: any) => void
    menuActive: MenuActive
}

export const Toolbar: React.FC<ToolbarProps> = (props) => {
    const {callback, menuActive} = props

    const onChangeShowing = (todoStatus: TodoStatus) => {
        callback(TYPE_CALLBACK.UPDATE_SHOWING_STATUS, todoStatus)
    }

    const onDeleteAllTodo = () =>{
        callback(TYPE_CALLBACK.DELETE_ALL)
    }

    return (
        <>
            <ItemSiderBar iconName="endless" label="All" onClick={() => onChangeShowing(TodoStatus.ALL)} isMenuAcive={menuActive === MenuActive.ALL} />
            <ItemSiderBar iconName="active" label="Active" onClick={() => onChangeShowing(TodoStatus.ACTIVE)} isMenuAcive={menuActive === MenuActive.ACTIVE}/>
            <ItemSiderBar iconName="phong" label="Completed" onClick={() => onChangeShowing(TodoStatus.COMPLETED)} isMenuAcive={menuActive === MenuActive.COMPLETED}/>
            <ItemSiderBar iconName="star_outline" label="Important" onClick={() => onChangeShowing(TodoStatus.IMPORTANT)} isMenuAcive={menuActive === MenuActive.IMPORTANT}/>
            <ItemSiderBar iconName="remove" label="Clear all todos" onClick={onDeleteAllTodo} isMenuAcive={menuActive === MenuActive.CLEAR}/>
        </>)
}