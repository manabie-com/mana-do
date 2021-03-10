import React, { useState } from 'react'
import { Todo } from '../models/todo';
import TodoForm from './TodoForm';


const TodoItem = ({ todo, isTodoCompleted, onUpdateTodoStatus, deleteTodo, updateTodo }:
    { todo: Todo, isTodoCompleted: Function, onUpdateTodoStatus: Function, deleteTodo: Function, updateTodo: Function }
) => {
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
    const editHandler = () => {
        setEdit(!edit);
    }

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const deleteHandler = (id: any) => {
        deleteTodo(id)
    }
    const onStatusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
        onUpdateTodoStatus(e, id);
    }

    const updateTodoItem = () => {
        updateTodo(todo.id, input);
        setEdit(!edit);
    }
    // if (edit) {
    //     return <TodoForm edit={todo} />
    // }
    return (
        <div className="ToDo__item">
            {/* <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onStatusChangeHandler(e, todo.id)}
            /> */}
            <span>{edit ? <input
                value={input}
                className="Todo__input"
                placeholder="What need to be done?"
                onChange={inputChangeHandler}
            /> : todo.content}</span>
            <div className="Todo__button">
                <div className="Todo__button edit">
                    {
                        edit ? <button
                            onClick={() => updateTodoItem()}>
                            update
                        </button>
                            :
                            <button
                                onClick={() => editHandler()}>
                                edit
                    </button>
                    }
                </div>
                <div className="Todo__button delete">
                    <button
                        onClick={() => (deleteHandler(todo.id))}
                    >
                        X </button>
                </div>
            </div>
        </div>
    );
}

export default TodoItem
