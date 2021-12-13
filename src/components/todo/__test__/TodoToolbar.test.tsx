import React from 'react'
import ReactDOM from 'react-dom'
import TodoToolbar from '../TodoToolbar'
import { render, cleanup } from '@testing-library/react'
import { TodoStatus } from '../../../models/todo'

afterEach(cleanup)

test('Todo toolbar renders without crashing', () => {
  const div = document.createElement('div')
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const isShowAll= true
  const onToggleAllTodo = jest.fn()
  const onDeleteAllTodo = jest.fn()
  const onToggleCompletedTodo = jest.fn()

  ReactDOM.render(
  <TodoToolbar
    todos={[todo]}
    isShowAll={isShowAll}
    onToggleAllTodo={onToggleAllTodo}
    onDeleteAllTodo={onDeleteAllTodo}
    onToggleCompletedTodo={onToggleCompletedTodo}
  />, div)
})

test('Todo toolbar matches snapshots with todos', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const isShowAll= true
  const onToggleAllTodo = jest.fn()
  const onDeleteAllTodo = jest.fn()
  const onToggleCompletedTodo = jest.fn()

  const { asFragment } = render(
    <TodoToolbar
      todos={[todo]}
      isShowAll={isShowAll}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
      onToggleCompletedTodo={onToggleCompletedTodo}
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo toolbar matches snapshots without todos', () => {
  const isShowAll= true
  const onToggleAllTodo = jest.fn()
  const onDeleteAllTodo = jest.fn()
  const onToggleCompletedTodo = jest.fn()

  const { asFragment } = render(
    <TodoToolbar
      todos={[]}
      isShowAll={isShowAll}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
      onToggleCompletedTodo={onToggleCompletedTodo}
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo toolbar input and buttons are present when there are todos', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const isShowAll= true
  const onToggleAllTodo = jest.fn()
  const onDeleteAllTodo = jest.fn()
  const onToggleCompletedTodo = jest.fn()

  const { getByTestId } = render(
    <TodoToolbar
      todos={[todo]}
      isShowAll={isShowAll}
      onToggleAllTodo={onToggleAllTodo}
      onDeleteAllTodo={onDeleteAllTodo}
      onToggleCompletedTodo={onToggleCompletedTodo}
    />
  )

  const todoToolbarCheckbox = getByTestId('todo-toolbar-checkbox')
  const todoToolbarComplete = getByTestId('todo-toolbar-complete-button')
  const todoToolbarDelete = getByTestId('todo-toolbar-delete-button')

  expect(todoToolbarCheckbox).toBeInTheDocument()
  expect(todoToolbarComplete).toBeInTheDocument()
  expect(todoToolbarDelete).toBeInTheDocument()
})

