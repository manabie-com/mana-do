import React from 'react'
import { Todo, TodoStatus } from '../models/todo';
import { isTodoCompleted } from '../utils';

interface Props {
    todoList: Todo[];
    onUpdateTodoStatus: any;
    deleteTodo: any;
}

const TodoList: React.FC<Props> = ({todoList, onUpdateTodoStatus, deleteTodo}) => {
    return(
        <div className="ToDo__list">
                {
                    todoList.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={onUpdateTodoStatus}
                                />
                                <span style={{
                                }}>{todo.content}</span>
                                <button
                                    className="Todo__delete"
                                    onClick={deleteTodo}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                }
            </div>
    )
}

export default TodoList;