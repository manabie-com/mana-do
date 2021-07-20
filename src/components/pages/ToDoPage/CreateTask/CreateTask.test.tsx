import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateTask from './CreateTask'
import ToDoPage from '../ToDoPage/ToDoPage'

describe('CreateTask', () => {
    it('should render create task', () => {
        render(<CreateTask />)
        expect(screen.getByPlaceholderText('What need to be done?')).toBeInTheDocument()
    })

    it('should create task successfully', () => {
        render(<ToDoPage />)
        userEvent.type(screen.getByPlaceholderText('What need to be done?'), 'createTask')
        fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })

        expect(screen.getByDisplayValue('createTask')).toBeInTheDocument()

        // expect(reducer(initialState, createTodo(testCreate1))).toEqual(
        //     {
        //         todos: [
        //             {
        //                 content: 'content1',
        //                 status: TodoStatus.ACTIVE,
        //                 id: 'id1',
        //                 created_date: 'created_date',
        //                 user_id: 'user_id'
        //             }
        //         ]
        //     })
    })

    it('should not create task when input is empty',async () => {
        render(<ToDoPage />)
        userEvent.type(screen.getByPlaceholderText('What need to be done?'), '')
        fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })

        await expect(screen.findByText('Task can not be empty'))

    })

    it('should show alert when task has been created', async () => {
        render(<ToDoPage />)
        userEvent.type(screen.getByPlaceholderText('What need to be done?'), 'createTask')
        fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })

        userEvent.type(screen.getByPlaceholderText('What need to be done?'), 'createTask')
        fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })
        await expect(screen.findByText('Task name createTask had been created'))
    })


})