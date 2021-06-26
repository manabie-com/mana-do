import React from 'react'
import { cleanup, render, screen, act, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import TodoContextProvider from 'src/context/TodoContext'
import Service from 'src/service'
import { Todo, TodoStatus } from 'src/models/todo'
import TodoList from './index'

jest.mock('src/service')

const mockedAxios = mocked(Service.getTodos)

afterEach(cleanup)

describe('TodoList', () => {
  test('renders todo list', async () => {
    await act(async () => {
      render(
        <TodoContextProvider>
          <TodoList />
        </TodoContextProvider>
      )
    })

    const todoList = screen.getByTestId('todoList')

    expect(todoList).toBeInTheDocument()
  })

  test('fetches todos', async () => {
    const todos: Todo[] = [
      {
        id: '1',
        user_id: 'firstUser',
        content: 'Test 1',
        status: TodoStatus.ACTIVE,
        created_date: '',
      },
      {
        id: '2',
        user_id: 'firstUser',
        content: 'Test 2',
        status: TodoStatus.ACTIVE,
        created_date: '',
      },
    ]
    mockedAxios.mockImplementationOnce(() => Promise.resolve(todos))

    await act(async () => {
      render(
        <TodoContextProvider>
          <TodoList />
        </TodoContextProvider>
      )

      await waitFor(() => {
        const todoList = screen.getByTestId('todoList')

        expect(todoList.children).toHaveLength(2)
        expect(todoList.firstChild).toHaveTextContent('Test 1')
      })
    })
  })
})
