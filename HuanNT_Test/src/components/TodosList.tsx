import React, { useRef, useState } from 'react';
import { Todo } from '../models/todo';
import { isTodoCompleted } from '../utils';

interface PropsTodo {
    todos?: Todo[],
    isDeleteRow?: boolean;
    isEditRow?: boolean;
    onUpdateTodoStatus?: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
    onChangeTodoContent?: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
    handleDeleteTodo?: (todo: Todo) => void,
}

const ToDosList = ({
    todos: showTodos = [],
    isDeleteRow = false,
    isEditRow = false,
    onUpdateTodoStatus = () => { },
    onChangeTodoContent = () => { },
    handleDeleteTodo = () => { },
}: PropsTodo) => {
    const [rowEditTodo, changeTextTodo] = useState<String>('');
    const inputEditRef = useRef<HTMLInputElement>(null);

    const onUpdateTodoContent = (todoId: string) => {
        if (isEditRow) {
            changeTextTodo(todoId);
            setTimeout(function () { if (inputEditRef.current) inputEditRef.current.focus(); }, 100);
        }
    }

    const onBlurTodoContent = () => {
        changeTextTodo('');
    }

    return (
        <div className="ToDo__list">
            {
                showTodos.map((todo, index) => {
                    return (
                        <div key={index} className="ToDo__item">
                            <input
                                className="ToDo__item__checkbox"
                                type="checkbox"
                                checked={isTodoCompleted(todo)}
                                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                            />
                            {isEditRow && rowEditTodo && rowEditTodo === todo.id &&
                                <input
                                    ref={inputEditRef}
                                    className="ToDo__item__edit"
                                    type="text"
                                    onChange={(e) => onChangeTodoContent(e, todo.id)}
                                    onBlur={() => onBlurTodoContent()}
                                    value={todo.content}
                                />
                            }
                            <span hidden={rowEditTodo && rowEditTodo === todo.id ? true : false} onDoubleClick={() => onUpdateTodoContent(todo.id)}>{todo.content}</span>
                            {isDeleteRow && <button
                                className="Todo__delete"
                                disabled={rowEditTodo && rowEditTodo === todo.id ? true : false}
                                onClick={() => handleDeleteTodo(todo)}
                            >
                                ✖
                            </button>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ToDosList;