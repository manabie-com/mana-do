/*
    This is a component for each todo item which is created.
*/

import React from 'react'
import './TodoItem.scss'

interface TodoItemProps {
    content: string,
    status: string | undefined,
    onEdit: React.MouseEventHandler<HTMLDivElement> | undefined
    onDelete: React.MouseEventHandler<HTMLButtonElement> | undefined,
    checked: boolean,
    onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement>
}


const TodoItem = ({ content, status, checked, onDelete, onEdit, onChangeCheckbox }: TodoItemProps) => {
    return (
        <div className="TodoItem" onDoubleClick={onEdit}>
            <input
                id="todoItemCheck"
                type="checkbox"
                checked={checked}
                onChange={onChangeCheckbox}
            />
            <p>{content}</p>
            <p>Status: <span>{status}</span></p>
            <div>
                <button className="red" onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem
