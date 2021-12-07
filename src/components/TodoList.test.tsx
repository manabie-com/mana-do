import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './TodoList'

describe('TodoList component test', () => {
  test('TodoList render', () => {
    const onDelete = jest.fn()
    const onUpdateTodoStatus = jest.fn()
    const onUpdateTodoContent = jest.fn()
    const { asFragment } = render(<TodoList todos={[]} showing='ALL' onDelete={onDelete} onUpdateTodoContent={onUpdateTodoContent} onUpdateTodoStatus={onUpdateTodoStatus} />)

    expect(asFragment(<TodoList todos={[]} showing='ALL' onDelete={onDelete} onUpdateTodoContent={onUpdateTodoContent} onUpdateTodoStatus={onUpdateTodoStatus} />)).toMatchSnapshot()
  })

  test('TodoList should be in the document', () => {
    const onDelete = jest.fn()
    const onUpdateTodoStatus = jest.fn()
    const onUpdateTodoContent = jest.fn()
    const { getByTestId } = render(<TodoList todos={[]} showing='ALL' onDelete={onDelete} onUpdateTodoContent={onUpdateTodoContent} onUpdateTodoStatus={onUpdateTodoStatus} />)
    const todoList = getByTestId('todo-list')

    expect(todoList).toBeInTheDocument()
  })
})