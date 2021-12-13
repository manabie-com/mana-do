import React from 'react'
import ReactDOM from 'react-dom'
import TodoInput from '../TodoInput'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('Todo Input renders without crashing', () => {
  const div = document.createElement('div')
  const onCreateTodo = jest.fn()

  ReactDOM.render(<TodoInput onCreateTodo={onCreateTodo}/>, div)
})

test('Todo Input page matches snapshot', () => {
  const onCreateTodo = jest.fn()

  const { asFragment } = render(<TodoInput onCreateTodo={onCreateTodo}/>)
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo input is the page', () => {
  const onCreateTodo = jest.fn()

  const { getByTestId } = render(<TodoInput onCreateTodo={onCreateTodo} />)
  const todoInput = getByTestId('todo-input')

  expect(todoInput).toBeInTheDocument()
})
