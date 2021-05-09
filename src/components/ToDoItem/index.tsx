import React, { useState, useRef } from 'react';

import './style.css'

type ToDoItemProps = {
    checked: boolean;
    content: any;
    onChangeStatus(status?: boolean): void;
    onUpdateContent(newContent: string): void
    onDelete(): void;
}

const TodoItem = (props : ToDoItemProps): JSX.Element => {
    const {
        content,
        onDelete,
        checked,
        onChangeStatus,
        onUpdateContent,
    } = props;

    const [ isContentEditable, setContentEditable ] = useState(false);
    const [contentValue, setContentValue] = useState(content);
    const [todoContent, setTodoContent] =  useState(content);
    const editContentRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeStatus(e.target.checked);
    }

    const handleDBClick = () => {
        setContentEditable(!isContentEditable);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { keyCode } = e;
        if (keyCode === 13 && editContentRef.current) {
            const newContent = editContentRef.current.value
            setContentEditable(false);
            setTodoContent(newContent);
            setContentValue(newContent);
            onUpdateContent(newContent)
        }
    }

    return <div className="ToDo__item">
    <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
    />
    {
        !isContentEditable 
        ? (<span
            onDoubleClick={handleDBClick}
            contentEditable={isContentEditable}
            suppressContentEditableWarning={true}
        >
            {todoContent}
        </span>)
        : (<input
            type="text"
            ref={editContentRef}
            defaultValue={contentValue}
            autoFocus={true}
            onKeyDown={handleKeyDown}
            className="input-edit-content"/>)
    }
    <button
        className="Todo__delete"
        onClick={onDelete}
    >
        X
    </button>
</div>
}

export default TodoItem;
