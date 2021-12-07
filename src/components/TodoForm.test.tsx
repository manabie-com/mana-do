import React from 'react';
import { render } from '@testing-library/react';
import TodoForm from './TodoForm'

describe('TodoForm component test', () => {
  test('TodoForm render', () => {
    const onKeyDown = jest.fn()
    const { asFragment } = render(<TodoForm onKeyDown={onKeyDown} />)

    expect(asFragment(<TodoForm onKeyDown={onKeyDown} />)).toMatchSnapshot()
  })

  test('TodoForm should be in the document', () => {
    const onKeyDown = jest.fn()
    const { getByTestId } = render(<TodoForm onKeyDown={onKeyDown} />)
    const todoForm = getByTestId('todo-form')

    expect(todoForm).toBeInTheDocument()
  })
})