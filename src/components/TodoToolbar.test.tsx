import React from 'react';
import { render } from '@testing-library/react';
import TodoToolbar from './TodoToolbar'

describe('TodoToolbar component test', () => {
  test('TodoToolbar render', () => {
    const setShowing = jest.fn()
    const onDeleteAllTodo = jest.fn()
    const onToggleAllTodo = jest.fn()
    const { asFragment } = render(<TodoToolbar todos={[]} onDeleteAllTodo={onDeleteAllTodo} setShowing={setShowing} onToggleAllTodo={onToggleAllTodo} />)

    expect(asFragment(<TodoToolbar todos={[]} onDeleteAllTodo={onDeleteAllTodo} setShowing={setShowing} onToggleAllTodo={onToggleAllTodo} />)).toMatchSnapshot()
  })

  test('TodoToolbar should be in the document', () => {
    const setShowing = jest.fn()
    const onDeleteAllTodo = jest.fn()
    const onToggleAllTodo = jest.fn()
    const { getByTestId } = render(<TodoToolbar todos={[]} onDeleteAllTodo={onDeleteAllTodo} setShowing={setShowing} onToggleAllTodo={onToggleAllTodo} />)
    const todoToolbar = getByTestId('todo-toolbar')

    expect(todoToolbar).toBeInTheDocument()
  })
})