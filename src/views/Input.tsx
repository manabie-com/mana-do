import React from 'react'
import Service from '../service'
import { AppActions, createTodo, updateTodoContent } from '../store/actions'

interface InputInterface {
    inputRef: React.RefObject<HTMLInputElement>
    todoEditingId: string | null
    setTodoEditingId: (id: string | null) => void
    onChangeTodos: (action: AppActions) => void
}

const Input = ({ inputRef, todoEditingId, setTodoEditingId, onChangeTodos }: InputInterface) => {
    const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' || !inputRef.current?.value.length) return
        // when users hit enter, check if they're adding new todo or editing
        // if 'todoEditingId' is not null, that means users are editing
        if (todoEditingId) {
            onEditTodo()
        } else {
            onCreateTodo(inputRef.current.value)
        }

        inputRef.current.value = '';
    }
    // when users are editing todo, if they click outside of input, we discard
    const onBlur = () => {
        if (todoEditingId && inputRef.current) {
            setTodoEditingId(null)
            inputRef.current.value = ''
        }
    }

    const onCreateTodo = async (value: string) => {
        const resp = await Service.createTodo(value);
        onChangeTodos(createTodo(resp));
    }

    const onEditTodo = async () => {
        if (!inputRef.current || !todoEditingId) return
        onChangeTodos(updateTodoContent(todoEditingId, inputRef.current?.value))
        setTodoEditingId(null)
    }

    return (
        <div className="Todo__creation">
            <input
                ref={inputRef}
                className="Todo__input"
                placeholder="What need to be done?"
                onKeyDown={onKeyDown}
                onBlur={onBlur}
            />
        </div>
    )
}

export default Input
