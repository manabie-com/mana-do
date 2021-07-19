import React, { useState } from 'react'
import { Todo } from '../../models/todo'
import Checkbox from '../Checkbox'
import styled from 'styled-components'
import { isTodoCompleted } from '../../utils'
import TextField from '../TextField'

const DeleteButton = styled.button`
    outline: none;
    border: none;
    width: 32px;
    height: 32px;
    min-width: auto;
    min-height: auto;
    box-shadow: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    background-color: red;
    font-size: 25px;
    :hover {
        transform: rotate(90deg);
        transition: all ease-out .2s;
    }
`
const StyledSpan = styled.span<ITodoItem>
`
    font-size: 25px;
    text-decoration: ${props => props.todoStatus === "COMPLETED" ? 'line-through' : 'none'};
`
interface ITodoItem {
    todoStatus: string
}

interface IProps {
    todo: Todo,
    onUpdateTodoContent: (todoId: string, todoContent: string) => void,
    onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void,
    onDeleteTodo: (todoId: string) => void,
}

const TodoItem = (props: IProps) => {
    const {todo, onDeleteTodo, onUpdateTodoContent, onUpdateTodoStatus} = props
    const [editingItem, setEditingItem] = useState<string>()
    const [editingContent, setEditingContent] = useState<string>("")

    const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingContent(e.target.value)
    }

    const handleUpdateTodoContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === "Enter" && editingContent && editingItem) {
            onUpdateTodoContent(editingItem, editingContent)
            setEditingContent("")
            setEditingItem(undefined)
        }
    }
    return (
        <div key={todo.id} className="ToDo__item"
            onDoubleClick={e => {
                setEditingItem(todo.id)
                setEditingContent(todo.content)
            }}
            data-testid={`${todo.id}-div`}
        >
            <Checkbox
                checked={isTodoCompleted(todo)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateTodoStatus(e, todo.id)}
                id={todo.id}
            />
            {editingItem == todo.id ? (
                <span >
                    <TextField
                        autoFocus
                        data-testid="todo-content"
                        onChange={onChangeContent}
                        onKeyDown={handleUpdateTodoContent}
                        value={editingContent}
                        onBlur={e => {
                            setEditingItem(undefined)
                        }} />
                </span>
            ) : (
                <StyledSpan
                    todoStatus={todo.status || ""}
                >
                    {todo.content}
                </StyledSpan>
            )}

            <DeleteButton
                data-testid={`${todo.id}-delete`}
                onClick={() => onDeleteTodo(todo.id)}
            >
                X
            </DeleteButton>
        </div>
    )
}

export default TodoItem