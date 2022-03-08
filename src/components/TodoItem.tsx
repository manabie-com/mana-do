import React, {Dispatch, useRef, useState} from "react";
import {
    AppActions,
    deleteTodo,
    updateTodoContent,
    updateTodoStatus
} from "store/actions";
import {Todo} from "models/todo";
import {isTodoCompleted} from "utils";

interface ToolBarProps {
    dispatch: Dispatch<AppActions>,
    todo: Todo,
}

const TodoItem: React.FC<ToolBarProps> = ({dispatch, todo}) => {
    const [editing, setEditing] = useState({id: '', text: ''});
    const editTodoRef = useRef<any>(null);

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const onDeleteTodo = (todoId: string) => {
        dispatch(deleteTodo(todoId))
    }

    const onToggleEditTodo = (todo: Todo) => {
        if (isTodoCompleted(todo)) return;
        setEditing({
            id: todo.id,
            text: todo.content
        })
    }

    const onUpdateTodoContentWhenEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        dispatch(updateTodoContent(editing.id, editing.text))
        setEditing({id: '', text: ''})
    }
    const onDiscardEditTodo = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditing({id: '', text: ''})
    }

    const editable = editing?.id && editing?.id === todo.id;
    const todoItemClassName = ['Todo__item', isTodoCompleted(todo) ? '__complete' : '', editable ? '__editing' : ''].join(' ');
    return (
        <div className={todoItemClassName}>
            {!editable && <input
                className="Todo__item__toggle"
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={e => onUpdateTodoStatus(e, todo.id)}
            />}
            <div className="Todo__item__content">
                <div className="__text" onDoubleClick={() => onToggleEditTodo(todo)}>{todo.content}</div>
            </div>
            {!editable &&
            <button title="Delete" className="Todo__item__delete" onClick={() => onDeleteTodo(todo.id)}>×</button>}
            {editable && <input
                ref={editTodoRef}
                className="__input_edit"
                type="text"
                autoFocus
                defaultValue={editing?.text}
                onChange={e => setEditing({id: todo.id, text: e.target.value})}
                onBlur={e => onDiscardEditTodo(e)}
                onKeyDown={e => onUpdateTodoContentWhenEnter(e)}
            />}
        </div>
    );
};

export default TodoItem;
