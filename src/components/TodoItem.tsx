import React, {ChangeEvent} from 'react';
import {Todo, TodoStatus} from "../models/todo";
import {isTodoCompleted} from "../utils";

interface Props {
    todo: Todo;
    showing: boolean;
    onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => void;
    onDeleteTodo: (todoId: string) => void;
}

const TodoItem: React.FC<Props> = (props) => {
    const { todo, showing } = props;
    if (!showing) {
        return null;
    }

    return (
        <div className="ToDo__item">
            {/*ADDED: wrap input and title in a label for a better UX*/}
            <label>
                <input
                    type="checkbox"
                    // Bug fixed: should be checked when status is COMPLETED
                    checked={isTodoCompleted(todo)}
                    // Bug fixed: should pass the todo.id instead of index
                    onChange={(e) => props.onUpdateTodoStatus(e, todo.id)}
                />
                <span>{todo.content}</span>
            </label>
            <button
                onClick={() => props.onDeleteTodo(todo.id)}
                className="Todo__delete"
            >
                X
            </button>
        </div>
    )
};

export default TodoItem;
