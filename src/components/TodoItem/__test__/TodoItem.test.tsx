import React from "react";
import shortid from "shortid";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

import { TodoItem, TodoItemProps } from '../index'
import { Todo, TodoStatus } from "../../../models/todo";


import "@testing-library/jest-dom";

/**
 * Test cases:
 * 1. should be rendered without crashing
 * 2. should be displayed with checkbox, content and delete button
 * 3. should be auto checked if todo status = "COMPLETE"
 * 4. should be auto un-checked if todo status = "ACTIVE"'
 * 5. should trigger change status event
 * 6. should be displayed content correctly
 * 7. should trigger delete todo event
 * 8. should be display edit todo input
 * 9. should be erased all changes after clicking outside
 * 10. should be updated content after pressing Enter
 */

describe('<TodoItem />', () => {
  const data: Todo = {
    id: shortid(),
    content: "New todo",
    user_id: "newUser",
    created_date: new Date().toUTCString(),
    status: TodoStatus.ACTIVE,
  }
  const onChangeStatus = jest.fn()
  const onDelete = jest.fn()
  const onEdit = jest.fn()

  const commonProps: TodoItemProps = {
    data,
    onChangeStatus,
    onDelete,
    onEdit
  }

  afterEach(cleanup)

  test('should be rendered without crashing', () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    expect(wrapper.container).toMatchSnapshot()
  })

  test('should be displayed with checkbox, content and delete button', () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    expect(wrapper.getAllByRole('checkbox')).toHaveLength(1)
    expect(wrapper.getByText(data.content)).toBeInTheDocument()
    expect(wrapper.getAllByRole('button')).toHaveLength(1)
  })

  test('should be auto checked if todo status = "COMPLETE"', () => {
    const newData: Todo = {...data, status: TodoStatus.COMPLETED }
    const props: TodoItemProps = {
      data: newData,
      onChangeStatus,
      onDelete,
      onEdit
    }
    const wrapper = render(<TodoItem {...props} />)
    expect(wrapper.getByRole('checkbox')).toBeChecked()
  })

  test('should be auto un-checked if todo status = "ACTIVE"', () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    expect(wrapper.getByRole('checkbox')).not.toBeChecked()
  })

  test('should trigger change status event', () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    const checkboxElement = wrapper.getByRole('checkbox')
    fireEvent.click(checkboxElement)
    expect(onChangeStatus).toBeCalled()
  })

  test('should be displayed content correctly', () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    expect(wrapper.getByText(data.content)).toBeInTheDocument()
  })

  test('should trigger delete todo event', () => {
    window.confirm = jest.fn(() => true)
    const wrapper = render(<TodoItem {...commonProps} />)
    fireEvent.click(wrapper.getByRole('button'))
    expect(window.confirm).toBeCalled()
    expect(onDelete).toBeCalled()
  })

  test('should be display edit todo input', async () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    fireEvent.doubleClick(wrapper.getByText(data.content))
    await waitFor(() => {
      expect(wrapper.getByTestId('todo-form-edit')).toBeInTheDocument()
    })
  })

  test('should be erased all changes after clicking outside', async () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    userEvent.dblClick(wrapper.getByText(data.content))
    await waitFor(() => {
      expect(wrapper.getByTestId('todo-form-edit')).toBeInTheDocument()
    })
    userEvent.type(wrapper.getByTestId('todo-input-edit'), 'Todo input test')
    userEvent.click(document.body)
    await waitFor(() => {
      expect(wrapper.getByTestId('todo-item')).toBeInTheDocument()
      expect(wrapper.getByText(data.content)).toBeInTheDocument()
      expect(onEdit).not.toBeCalled()
    })
  })

  test('should be updated content after pressing Enter', async () => {
    const wrapper = render(<TodoItem {...commonProps} />)
    userEvent.dblClick(wrapper.getByText(data.content))
    await waitFor(() => {
      expect(wrapper.getByTestId('todo-form-edit')).toBeInTheDocument()
    })
    userEvent.type(wrapper.getByTestId('todo-input-edit'), 'testing input values')
    fireEvent.submit(wrapper.getByTestId('todo-form-edit'))
    await waitFor(() => {
      expect(wrapper.getByTestId('todo-item')).toBeInTheDocument()
      expect(wrapper.getByText(/testing input values/)).toBeInTheDocument()
      expect(onEdit).toBeCalled()
    })
  })
})