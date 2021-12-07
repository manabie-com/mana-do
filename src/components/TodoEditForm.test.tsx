import React from 'react';
import { render } from '@testing-library/react';
import TodoEditForm from './TodoEditForm'

describe('TodoEditForm component test', () => {
  test('TodoEditForm render', () => {
    const todo = {
      id: '1',
      user_id: '1',
      content : 'Test',
      created_date: '2021-12-06T15:57:42.254Z',
    }
    const onUpdateTodo = jest.fn()
    const onCancelUpdate = jest.fn()
    const { asFragment } = render(<TodoEditForm todo={todo} onUpdateTodo={onUpdateTodo} onCancelUpdate={onCancelUpdate} />)

    expect(asFragment(<TodoEditForm todo={todo} onUpdateTodo={onUpdateTodo} onCancelUpdate={onCancelUpdate} />)).toMatchSnapshot()
  })

  test('TodoEditForm should be in the document', () => {
    const todo = {
      id: '1',
      user_id: '1',
      content : 'Test',
      created_date: '2021-12-06T15:57:42.254Z',
    }
    const onUpdateTodo = jest.fn()
    const onCancelUpdate = jest.fn()
    const { getByTestId } = render(<TodoEditForm todo={todo} onUpdateTodo={onUpdateTodo} onCancelUpdate={onCancelUpdate} />)
    const todoEditForm = getByTestId('todo-edit-form')

    expect(todoEditForm).toBeInTheDocument()
  })
})