import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import shortid from 'shortid'

import TodoListItem from '.'

const todo = {
  id: shortid(),
  user_id: 'firstUser',
  content: 'item',
  created_date: new Date().toISOString()
}

afterEach(cleanup)

it('should render item correctly.', () => {
  const { getByText } = render(
    <TodoListItem todo={todo} handleUpdateTodo={jest.fn()} handleDeleteTodo={jest.fn()} />)

  expect(getByText(todo.content)).toBeInTheDocument()
})

it('should handle item editing correctly.', () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <TodoListItem todo={todo} handleUpdateTodo={jest.fn()} handleDeleteTodo={jest.fn()} />)

  expect(queryByTestId('edit-input')).toBeNull()

  fireEvent.doubleClick(getByText(todo.content))

  expect(getByTestId('edit-input')).toBeInTheDocument()

  fireEvent.blur(getByTestId('edit-input'))

  expect(queryByTestId('edit-input')).toBeNull()
})
