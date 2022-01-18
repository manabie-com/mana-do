import React from 'react'
import { render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import shortid from 'shortid';

import {ToDoPage} from '../page/ToDoPage'

import Service from '../service'
import { TodoStatus } from '../models/todo';
import { successResponse } from '../utils/constant';

import "@testing-library/jest-dom";

/**
 * Test cases
 * 1. The ToDoPage should be rendered without crashing
 * 2. The ToDoPage should be display a input, a todo list and four buttons
 * 3. The todo list should be display
 * 4. The todo list should be displayed "Nothing to show" if it is empty
 * 5. The todo list should be filtered correctly
 * 6. The "toggle checkbox" should be auto checked if todo list contains all complete todo
 * 7. The todo list should be updated status after clicking the bottom checkbox
 * 8. The todo list should be removed after clicking the "Clear all" button
 */


describe('<ToDoPage />', () => {

  test('The ToDoPage should be rendered without crashing', () => {
    const wrapper = render(<ToDoPage />)
    expect(wrapper.container).toMatchSnapshot()
  })

  test('The ToDoPage should be display a input, a todo list and four buttons', () => {
    const wrapper = render(<ToDoPage />)
    expect(wrapper.getByTestId('todo-form-create')).toBeInTheDocument()
    expect(wrapper.getByTestId('todo-list')).toBeInTheDocument()
    expect(wrapper.getAllByTestId('filter-button')).toHaveLength(3)
    expect(wrapper.getByTestId('clear-all')).toBeInTheDocument()
  })

  test('The todo list should be display', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce([
      {
        id: shortid(),
        content: "New todo",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.ACTIVE,
      }
    ])
    const wrapper = render(<ToDoPage />)
    await waitFor(() => {
      expect(wrapper.getAllByTestId('todo-item')).toHaveLength(1)
      expect(wrapper.getByTestId('todo-toggle-status')).toBeInTheDocument()
    })
  })

  test('The todo list should be displayed "Nothing todo!" if it is empty', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce([])
    const wrapper = render(<ToDoPage />)
    await waitFor(() => expect(wrapper.getByText('Nothing todo!')).toBeInTheDocument())
  })

  test('The todo list should be filtered correctly', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce([
      {
        id: shortid(),
        content: "New todo 1",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.ACTIVE,
      },
      {
        id: shortid(),
        content: "New todo 2",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.COMPLETED,
      },
      {
        id: shortid(),
        content: "New todo 3",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.COMPLETED,
      }
    ])
    const wrapper = render(<ToDoPage />)
    const filterAllButton = wrapper.getAllByTestId('filter-button')[0]
    const filterActiveButton = wrapper.getAllByTestId('filter-button')[1]
    const filterCompleteButton = wrapper.getAllByTestId('filter-button')[2]

    userEvent.click(filterActiveButton)
    await waitFor(() => {
      expect(wrapper.getAllByTestId('todo-item')).toHaveLength(1)
      expect(filterActiveButton).toHaveClass('active')
    })

    userEvent.click(filterAllButton)
    await waitFor(() => {
      expect(wrapper.getAllByTestId('todo-item')).toHaveLength(3)
      expect(filterAllButton).toHaveClass('active')
    })

    userEvent.click(filterCompleteButton)
    await waitFor(() => {
      expect(wrapper.getAllByTestId('todo-item')).toHaveLength(2)
      expect(filterCompleteButton).toHaveClass('active')
    })
  })

  test('The "toggle checkbox" should be auto checked if todo list contains all complete todo', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce([
      {
        id: shortid(),
        content: "New todo 1",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.COMPLETED,
      },
      {
        id: shortid(),
        content: "New todo 2",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.COMPLETED,
      }
    ])
    const wrapper = render(<ToDoPage />)
    await waitFor(() => {
      expect(wrapper.getByTestId('todo-toggle-status')).toBeChecked()
    })
  })

  test('The todo list should be updated status after clicking the bottom checkbox', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce([
      {
        id: shortid(),
        content: "New todo 1",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.ACTIVE,
      },
      {
        id: shortid(),
        content: "New todo 2",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.ACTIVE,
      },
      {
        id: shortid(),
        content: "New todo 3",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.COMPLETED,
      }
    ])
    jest.spyOn(Service, 'changeTodosStatus').mockResolvedValueOnce(successResponse)
    const wrapper = render(<ToDoPage />)
    await waitFor(() => {
      userEvent.click(wrapper.getByTestId('todo-toggle-status'))
    })
    await waitFor(() => {
      expect(wrapper.getAllByTestId('todo-item-checkbox')[0]).toBeChecked()
      expect(wrapper.getAllByTestId('todo-item-checkbox')[1]).toBeChecked()
      expect(wrapper.getAllByTestId('todo-item-checkbox')[2]).toBeChecked()
      expect(wrapper.getByTestId('todo-toggle-status')).toBeChecked()
    })
  })

  test('The todo list should be removed after clicking the "Clear all" button', async () => {
    jest.spyOn(Service, 'getTodos').mockResolvedValueOnce([
      {
        id: shortid(),
        content: "New todo 1",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.COMPLETED,
      },
      {
        id: shortid(),
        content: "New todo 2",
        user_id: "newUser",
        created_date: new Date().toUTCString(),
        status: TodoStatus.ACTIVE,
      }
    ])
    jest.spyOn(Service, 'removeAllTodo').mockResolvedValueOnce(successResponse)
    const wrapper = render(<ToDoPage />)
    userEvent.click(wrapper.getByTestId('clear-all'))
    await waitFor(() => {
      expect(wrapper.getByText('Nothing todo!')).toBeInTheDocument()
    })
  })

})