import React, { useState, useEffect } from 'react';

import { TodoStatus, EditTodo, Todo } from '../../../models/todo';
import { getRandomInt } from '../../../helpers';

import {
    updateTodo,
    updateTodoStatus,
    deleteTodo
} from '../../../store/actions';

import { MOTIV_MSG1, MOTIV_MSG2, MOTIV_MSG3, COMPLETED_TASK_MSG, NOT_YET_DONE_MSG } from '../../../constants';

const ALL: string = "ALL";
type EnhanceTodoStatus = TodoStatus | typeof ALL;

interface TodoListTypes {
    todos: Array<Todo>,
    showing: EnhanceTodoStatus,
    setShowing: any,
    dispatch: any
};

const motivationalMsg: string[] = [
    MOTIV_MSG1,
    MOTIV_MSG2,
    MOTIV_MSG3,
];

const TodoList = ({ todos, showing, setShowing, dispatch }: TodoListTypes) => {
    const [motivationMessage, setMotivationalMessage] = useState<string>(motivationalMsg[0]);
    const [editTodo, setEditTodo] = useState<EditTodo>({ editMode: false, id: null, content: null });

    useEffect(() => {
        if (showing === TodoStatus.COMPLETED) {
            setMotivationalMessage(motivationalMsg[getRandomInt(3)]);
        }
    }, [showing]);

    const onDeleteTodoById = (todiId: any) => dispatch(deleteTodo(todiId));

    const onChangeEditTodo = (id: any, content: any) => setEditTodo(prev => ({ ...prev, id, content }));

    const handleEditTodo = (id: any, content: any) => setEditTodo({ editMode: true, id, content });

    const onUpdateTodo = (id: any, content: any) => {
        let data = { editMode: false, id, content };
        setEditTodo(prev => ({ ...prev, ...data }));
        dispatch(updateTodo(data));
    };

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => dispatch(updateTodoStatus(todoId, e.target.checked));

    const filterTodosList = (status: string) => {
        if (showing === ALL) {
            return true
        } else if (showing === status) {
            return true;
        } else {
            return false;
        }
    };

    const checkTodosByStatus = () => {
        const result = todos.find(item => item.status === showing);

        if (!result && showing !== ALL) {
            if (todos.length > 0) {
                if (showing === TodoStatus.COMPLETED) {
                    return <>
                        <small>{NOT_YET_DONE_MSG}</small>
                        <p>{motivationMessage}</p>
                    </>;
                } else {
                    return COMPLETED_TASK_MSG;
                }
            }
        }
    };

    return (
        <div className="ToDo__list">
            {   
                todos.map((todo, index) =>
                    filterTodosList(todo.status) &&
                    <div
                        key={index}
                        className="ToDo__item"
                        data-testid="todo__item"
                    >
                        <input
                            type="checkbox"
                            checked={todo.status === TodoStatus.COMPLETED}
                            onChange={e => onUpdateTodoStatus(e, todo.id)}
                        />
                        <span className={`todo__${todo.status}`} onDoubleClick={() => handleEditTodo(todo.id, todo.content)}>
                            {
                                (editTodo.editMode && editTodo.id === todo.id)
                                ? <input
                                    value={editTodo.content}
                                    onChange={e => onChangeEditTodo(todo.id, e.target.value)}
                                    onBlur={() => onUpdateTodo(todo.id, editTodo.content)}
                                    style={{ width: '95%' }}
                                />
                                : todo.content
                            }
                        </span>
                        <button
                            className="Todo__delete"
                            onClick={() => onDeleteTodoById(todo.id)}
                        >
                            X
                        </button>
                    </div>
                )
            }
            {checkTodosByStatus()}
            {
                todos.length === 0
                && <div
                        className='toDo__message'
                        data-testid='no__todo__message'
                    >
                        <h4>MANABIE TO DO</h4>
                        <p>Free up your mental space, gives you focus, from work to play.</p>
                    </div>
            }
        </div>
    )
};

export default TodoList;