import React, { useEffect, useReducer, useRef, useState } from 'react'
import TodoToolbar from './containers/TodoAction'
import TodoList from './containers/TodoList'
import { TodoContext } from './contexts/todo'
import { EnhanceTodoStatus } from './models/todo'
import Service from './service'
import { createTodo, setTodos } from './store/actions'
import reducer, { initialState } from './store/reducer'
import {RouteComponentProps} from 'react-router-dom'


const ToDoPage = ({history}: RouteComponentProps) => {
    const [store, dispatch] = useReducer(reducer, initialState)
    const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        (async () => {
            const resp = await Service.getTodos()
            dispatch(setTodos(resp || []))
        })()
    }, [])

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current && !!inputRef.current.value.trim()) {
            try {
                const resp = await Service.createTodo(inputRef.current.value)
                dispatch(createTodo(resp))
                inputRef.current.value = ''
            } catch (e) {
                if (e.response?.status === 401) {
                    history.push('/')
                }
            }
        }
    }

    return (
        <TodoContext.Provider value={{ store, dispatch }}>
            <div className="ToDo__container">
                <div className="Todo__creation">
                    <input
                        ref={inputRef}
                        className="Todo__input"
                        placeholder="What need to be done?"
                        onKeyDown={onCreateTodo}
                    />
                </div>
                <TodoList status={showing}/>
                <TodoToolbar onFilterStatus={setShowing}/>
            </div>
        </TodoContext.Provider>
    )
}

export default ToDoPage
