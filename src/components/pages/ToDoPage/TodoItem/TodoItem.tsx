import React, { useState } from 'react';
import { Todo } from '../../../../models/todo';
import { AppActions, deleteTodo, editTodo, updateTodoStatus } from '../../../../store/actions';
import { isTodoCompleted } from '../../../../utils';
import Button from '../../../atom/Button/Button';
import FormInput from '../../../atom/FormInput/FormInput';

import './todoItem.scss'

interface ITodo {
    todo: Todo
    dispatch: React.Dispatch<AppActions>
    todosLength: number
}

export const BackgroundColor = {
    isCompleted: 'rgb(0, 255, 204)',
    isActive: 'rgb(255, 147, 147)'
}

const TodoItem = ({ todo, dispatch, todosLength }: ITodo) => {
    const [content, setContent] = useState<string>(todo.content)
    const [readOnly, setReadOnly] = useState<boolean>(true)

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        dispatch(updateTodoStatus(todoId, e.target.checked))
    }

    const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(editTodo(todo.id, content))
            setReadOnly(true)
        }
    }

    const handleDelete = () => {
        if (todosLength === 1) {
            localStorage.removeItem('task')
        }
        dispatch(deleteTodo(todo.id));
    }

    return (
        <div data-testid={todo.id} className="ToDo__item">
            <FormInput className='ToDo__item-checkbox' type="checkbox" onChange={(e) => onUpdateTodoStatus(e, todo.id)} checked={isTodoCompleted(todo)} />
            <FormInput
                //to set background base on status of task
                style={isTodoCompleted(todo) ?
                    { backgroundColor: BackgroundColor.isCompleted }
                    : { backgroundColor: BackgroundColor.isActive }}
                className='ToDo__item-value'
                readOnly={readOnly}
                value={readOnly ? todo.content : content}
                onChange={(e: any) => setContent(e.target.value)}
                onDbClick={() => setReadOnly(false)}
                onKeyDown={handleEdit}
                onBlur={() => {
                    setContent(todo.content)
                    setReadOnly(true)
                }}
            />
            <Button
                label='X'
                className="ToDo__item-delete"
                onClick={handleDelete} />
        </div>
    )
}

export default TodoItem;