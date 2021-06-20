import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {isTodoCompleted} from "../utils";
import {Todo, TodoStatus} from "../models/todo";
import {TodoPageContext} from "../context/todo";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
export const TodoItem = React.memo((props: TodoItemProps) => {
    const {todo, onDelete, onComplete, isEdited = false, onSelect, onCancel, onEdit} = props;
    const [text, setText] = useState(todo.content)
    const itemRef = useRef<HTMLDivElement>(null);
    const _handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        todo.status !== TodoStatus.COMPLETED && onSelect(e);
    }

    const _handleClickOutside = (e: MouseEvent) => {

        if (e.target && !itemRef.current?.contains(e.target as Node)) {
            onCancel(e);
        }
    };
    const _editText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        isEdited && document.addEventListener("mousedown", _handleClickOutside);
        return () => document.removeEventListener("mousedown", _handleClickOutside);
    });

    //reset edit text
    useEffect(() => {
        if (!isEdited && todo.content !== text) {
            setText(todo.content)
        }
    }, [isEdited, text, todo.content]);
    return <div
        className={["ToDo__item", todo.status === TodoStatus.ACTIVE ? 'status-active' : 'status-complete'].join(' ')}
        onDoubleClick={_handleDoubleClick} ref={itemRef}>
        <input
            type="checkbox"
            className={'Todo__checkbox'}
            checked={isTodoCompleted(todo)}
            onChange={onComplete}
        />
        {!isEdited && <span className={"Todo__text"}>{todo.content}</span>}

        {isEdited && <textarea
            className={"Todo__edit"}
            value={text}
            onChange={_editText}
            onKeyDown={_onKeyDown}
        />}
        <div className={'Todo__delete'}>
        <FontAwesomeIcon icon={faTimes} className={'Todo__icon'} onClick={onDelete}/>
        </div>
    </div>
})
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
        <label className={'Todo__label'}> Today's tasks</label>
        <div className={'Todo__items'}>
            {
                todos.map((todo, index) => {
                    const _onComplete = onUpdateItem(todo.id)
                    const _onDelete = onDeleteItem(todo.id)
                    const _onSelect = onSelectItem(todo.id)
                    const _onCancel = onRemoveSelected('')
                    const _onEdit = onEditItem(todo.id)
                    const _isSeletected = todo.id === selectedItem && todo.status !== TodoStatus.COMPLETED
                    return <TodoItem key={todo.id} todo={todo} isEdited={_isSeletected} onComplete={_onComplete}
                                     onDelete={_onDelete} onSelect={_onSelect} onCancel={_onCancel} onEdit={_onEdit}/>
                })
            }
        </div>
    </div>
}