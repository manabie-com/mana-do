import React, {ChangeEvent, useState} from 'react';
import {Todo, TodoStatus} from "../models/todo";
import {isTodoCompleted} from "../utils";

interface Props {
    todo: Todo;
    showing: boolean;
    onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => void;
    onUpdateTodoContent: (todoId: string, content: string) => void;
    onDeleteTodo: (todoId: string) => void;
}

const TodoItem: React.FC<Props> = (props) => {
    const { todo, showing } = props;
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState('');
    if (!showing) {
        return null;
    }

    const onEdit = () => {
        setInput(todo.content);
        setEditing(true);
    };

    const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditing(false);
            props.onUpdateTodoContent(todo.id, input);
        }
    };

    const onDiscard = () => {
        setInput(props.todo.content);
        setEditing(false);
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="ToDo__item">
            <label className="container">
                <input
                    type="checkbox"
                    // Bug fixed: should be checked when status is COMPLETED
                    checked={isTodoCompleted(todo)}
                    // Bug fixed: should pass the todo.id instead of index
                    onChange={(e) => props.onUpdateTodoStatus(e, todo.id)}
                />
                <span className="checkmark"/>
            </label>
            {editing ? (
                <input type="text" value={input}
                       className="Todo__edit"
                       onChange={onChangeInput}
                       onBlur={onDiscard}
                       onKeyDown={onSubmit} />
            ) : (<span className="Todo__edit" onDoubleClick={onEdit}>{todo.content}</span>)}
            <button
                onClick={() => props.onDeleteTodo(todo.id)}
                className="Todo__delete"
            >
            </button>
        </div>
    )
};

export default TodoItem;
