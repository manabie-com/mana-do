import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {isTodoCompleted} from "../utils";
import {deleteTodo} from "../store/actions";
import {Todo, TodoStatus} from "../models/todo";
import {TodoPageContext} from "../context/todo";

type TodoListProps = {
    todos: Todo[];
    updateItem: (...params: any) => any
    deleteItem: (params: any) => any
    selectItemEdit: (params: any) => any
    editItem: (...params: any) => any
}
type TodoItemProps = {
    todo: Todo
    onDelete: (params: any) => any
    onComplete: (params: any) => any
    isEdited?: boolean
    onSelect: (params: any) => any
    onCancel: (params?: any) => any
    onEdit: (params: any) => any
}
export const TodoItem = (props: TodoItemProps) => {
    const {todo, onDelete, onComplete, isEdited = false, onSelect, onCancel, onEdit} = props;
    const [text, setText] = useState(todo.content)
    const myRef = useRef<HTMLDivElement>(null);
    const _handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(e);
    }

    const _handleClickOutside = (e: MouseEvent) => {

        if (e.target && !myRef.current?.contains(e.target as Node)) {
            onCancel(e);
        }
    };
    const _editText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }
    const _onKeyDown = (e: React.KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
            onEdit(text);
            onCancel(e);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", _handleClickOutside);
        return () => document.removeEventListener("mousedown", _handleClickOutside);
    });
    return <div className="ToDo__item" onDoubleClick={_handleDoubleClick} ref={myRef}>
        <input
            type="checkbox"
            checked={isTodoCompleted(todo)}
            onChange={onComplete}
        />
        {!isEdited && <span>{todo.content}</span>}
        {isEdited && <input
            type="text"
            value={text}
            onChange={_editText}
            onKeyDown={_onKeyDown}
        />}
        <span>{todo.status}</span>
        <button
            className="Todo__delete"
            onClick={onDelete}
        >
            X
        </button>
    </div>
}
export const TodoList = (props: TodoListProps) => {
    const {todos = [], updateItem, deleteItem, selectItemEdit, editItem} = props;
    const context = useContext(TodoPageContext);
    const selectedItem = useMemo(() => context.selectedItem, [context]);
    const onUpdateItem = (todoId: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLOptionElement>) => updateItem(e, todoId)
    const onDeleteItem = (todoId: string) => () => deleteItem(todoId)
    const onSelectItem = (todoId: string) => () => selectItemEdit(todoId)
    const onRemoveSelected = (todoId: string) => () => selectItemEdit(todoId)
    const onEditItem = (todoId: string) => (value: string) => editItem(todoId, value)
    return <div className="ToDo__list">
        {
            todos.map((todo, index) => {
                const _onComplete = onUpdateItem(todo.id)
                const _onDelete = onDeleteItem(todo.id)
                const _onSelect = onSelectItem(todo.id)
                const _onCancel = onRemoveSelected('')
                const _onEdit = onEditItem(todo.id)
                const _isSeletected = todo.id === selectedItem
                return <TodoItem key={index} todo={todo} isEdited={_isSeletected} onComplete={_onComplete}
                                 onDelete={_onDelete} onSelect={_onSelect} onCancel={_onCancel} onEdit={_onEdit}/>
            })
        }
    </div>
}