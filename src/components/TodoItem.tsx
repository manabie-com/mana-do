import React, { useState, useReducer, useEffect } from "react";
import {Todo} from '../models/todo'
import { isTodoCompleted } from '../utils';
import reducer, { initialState } from '../store/reducer';
import { IoTrashBin } from "react-icons/io5";
import IconButton from '@material-ui/core/IconButton';
import OutsideClickHandler from 'react-outside-click-handler';
import {   
    updateTodoContent,
} from '../store/actions';

export interface Props {
    todo: Todo,
    onDeleteTodo: (todoId: string) => void,
    onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
    recalculatePercentage: () => void
}

const TodoItem = (props: any) => {
    const [{ todos }, dispatch] = useReducer(reducer, initialState);
    const [content, setContent] = useState<string>('')
    const [toggle, setToggle] = useState<boolean>(true)

    useEffect(() => {
        setContent(props.todo.content)
    }, [])
    
    const onRestoreTodoContent = () => {
        setContent(props.todo.content)
        setToggle(true)
    }

    const onSaveTodoContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && content) {
            dispatch(updateTodoContent(props.todo.id, content));
            setToggle(true)
        }
    }

    return (
        <OutsideClickHandler
            onOutsideClick={onRestoreTodoContent}
        >
            <div className={`todo-item ${(!toggle)? "on-toggle-todo-item" : ""}`}>
                <input
                    type="checkbox"
                    checked={isTodoCompleted(props.todo)}
                    onChange={(e) => props.onUpdateTodoStatus(e, props.todo.id)}
                />
                {toggle ? (
                    <div
                        onDoubleClick={() => {
                            setToggle(false)
                        }}
                    >{content}</div>
                ) : (
                    <input
                        type='text'
                        className='todo-item-content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={onSaveTodoContent}
                    />
                )}
                <IconButton color="secondary" aria-label="delete" onClick={() => props.onDeleteTodo(props.todo.id)}>
                    <IoTrashBin />
                </IconButton>
            </div>
        </OutsideClickHandler>
    )
}

export default TodoItem