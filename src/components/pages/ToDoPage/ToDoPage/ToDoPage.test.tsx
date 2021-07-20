import React from 'react'
import { createTodo, deleteAllTodos, deleteTodo, editTodo, setTodos, toggleAllTodos } from "../../../../store/actions"
import reducer, { initialState } from "../../../../store/reducer"
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ToDoPage from "./ToDoPage"
import { Todo, TodoStatus } from '../../../../models/todo'
import ShowTodoList from '../ShowTodoList/ShowTodoList'
import userEvent from '@testing-library/user-event'

const testCreate1: Todo = {
    content: 'content1',
    status: TodoStatus.ACTIVE,
    id: 'id1',
    created_date: 'created_date',
    user_id: 'user_id'
}
const dummyArray = {
    todos: [
        {
            content: 'content1',
            status: TodoStatus.ACTIVE,
            id: 'id1',
            created_date: 'created_date',
            user_id: 'user_id'
        },
        {
            content: 'content2',
            status: TodoStatus.ACTIVE,
            id: 'id2',
            created_date: 'created_date',
            user_id: 'user_id'
        }
    ] as Todo[]
}


describe('ToDoPage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should edit task manual successfully', async () => {
        const dummyArray = {
            todos: [
                {
                    content: 'content1',
                    status: TodoStatus.ACTIVE,
                    id: 'id1',
                    created_date: 'created_date',
                    user_id: 'user_id'
                },
                {
                    content: 'content2',
                    status: TodoStatus.ACTIVE,
                    id: 'id2',
                    created_date: 'created_date',
                    user_id: 'user_id'
                }
            ] as Todo[]
        }
        render(<ShowTodoList todos={dummyArray.todos} />)
        userEvent.dblClick(screen.getByDisplayValue('content1'))
        fireEvent.change(screen.getByDisplayValue('content1'), { target: { value: 'contentNew' } })
        fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })
        expect(screen.getByDisplayValue('contentNew')).toBeInTheDocument()

    })

    it('should toggle all to do', () => {
        expect(reducer(dummyArray, setTodos(dummyArray.todos))).toEqual(
            {
                todos: [
                    {
                        content: 'content1',
                        status: TodoStatus.COMPLETED,
                        id: 'id1',
                        created_date: 'created_date',
                        user_id: 'user_id'
                    },
                    {
                        content: 'content2',
                        status: TodoStatus.COMPLETED,
                        id: 'id2',
                        created_date: 'created_date',
                        user_id: 'user_id'
                    }
                ]
            }
        )
    })

    it('should delete task successfully', () => {
        const deleteTask = reducer(dummyArray, deleteTodo('id1'))
        expect(deleteTask).toEqual({
            todos: [{
                content: 'content2',
                status: TodoStatus.ACTIVE,
                id: 'id2',
                created_date: 'created_date',
                user_id: 'user_id'
            }]
        })
    })

    it('should delete all task successfully', () => {
        const dummyArray = {
            todos: [
                {
                    content: 'content1',
                    status: TodoStatus.ACTIVE,
                    id: 'id1',
                    created_date: 'created_date',
                    user_id: 'user_id'
                },
                {
                    content: 'content2',
                    status: TodoStatus.ACTIVE,
                    id: 'id2',
                    created_date: 'created_date',
                    user_id: 'user_id'
                }
            ]
        }

        const deleteTask = reducer(dummyArray, deleteAllTodos())
        expect(deleteTask).toEqual({
            "todos": []
        })
    })


})
