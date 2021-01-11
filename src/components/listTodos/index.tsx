import React, { useState, useReducer } from 'react';
import { isTodoCompleted } from '../../utils';
import { Todo, TodoStatus } from '../../models/todo';

import reducer, { initialState } from '../../store/reducer';
import './style.css';
import { updateTodoStatus } from '../../store/actions';

interface Props {
    todosList: Todo[];
    showing: String;
    onUpdateTodoStatus: Function;
    onDeleteTodo: Function;
    onEditTodo: Function;
}

TodosList.defaultProps = {
    todosList: [],
    showing: '',
    onUpdateTodoStatus: null,
    onDeleteTodo: null,
    onEditTodo: null,
}

function TodosList(props: Props) {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const { todosList, showing, onUpdateTodoStatus, onDeleteTodo, onEditTodo } = props;
    const [todoList, setTodoList] = useState<Todo[]>(todosList);
    const [editContent, setEditContent] = useState<Todo>(todosList[1]);

    // const onHandleUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    //     if (onUpdateTodoStatus == null) return false;

    //     onUpdateTodoStatus(todoId, e);
    // }

    const onHandleDeleteTodo = (todoId: string) => {
        if (onDeleteTodo == null) return false;

        onDeleteTodo(todoId);
    }

    const onHandleEditTodo = (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
        if (onEditTodo == null) return false;

        onEditTodo(e, todo.id, todo.content);
        if (e.key === 'Enter') {
            e.currentTarget.parentElement?.classList.remove("active");
        }
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        const newTodoList = [...todoList];
        const foundIndex = todoList.findIndex(x => x.id === todo.id);
        if (foundIndex >= 0) {
            setEditContent(todosList[foundIndex]);
            newTodoList[foundIndex] = {
                ...todoList[foundIndex],
                content: e.target.value,
            };
            setTodoList(newTodoList);
        }
    }

    const onHandleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.parentElement?.classList.remove("active");
        const newTodoList = [...todoList];
        const foundIndex = todoList.findIndex(x => x.id === editContent.id);
        if (foundIndex >= 0) {
            newTodoList[foundIndex] = {
                ...todoList[foundIndex],
                content: editContent.content,
            };
            e.currentTarget.value = newTodoList[foundIndex].content;
            setTodoList(newTodoList);
        }
    }

    const showTodos = todoList.filter((todo) => {
        switch (showing) {
            case TodoStatus.ACTIVE:
                return todo.status === TodoStatus.ACTIVE;
            case TodoStatus.COMPLETED:
                return todo.status === TodoStatus.COMPLETED;
            default:
                return true;
        }
    });

    const onUpdateTodoStatusItem = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    return (
        <div className="ToDo__list">
            {
                showTodos.map((todo, index) => {
                    return (
                        <div key={index} className="ToDo__item">
                            <input
                                type="checkbox"
                                checked={isTodoCompleted(todo)}
                                onChange={(e) => onUpdateTodoStatusItem(e, todo.id)}
                            />
                            <div className="editInput">
                                <span onDoubleClick={(e) => { e.currentTarget.parentElement?.classList.add("active") }}>{todo.content}</span>
                                <input
                                    value={todo.content}
                                    className="Todo__input"
                                    onChange={(e) => handleValueChange(e, todo)}
                                    onBlur={(e) => { onHandleBlur(e) }}
                                    onKeyDown={(e) => onHandleEditTodo(e, todo)}
                                />
                            </div>
                            <button
                                className="Todo__delete"
                                onClick={() => onHandleDeleteTodo(todo.id)}
                            >
                                X
                            </button>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default TodosList;