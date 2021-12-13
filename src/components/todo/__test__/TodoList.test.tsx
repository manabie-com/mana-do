import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from '../TodoList'
import { render, cleanup } from '@testing-library/react'
import { TodoStatus } from '../../../models/todo'

afterEach(cleanup)

test('Todo List renders without crashing', () => {
  const div = document.createElement('div')
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const isShowAll= true
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  ReactDOM.render(
  <TodoList
    todos={[todo]}
    isShowAll={isShowAll}
    onEditTodo={onEditTodo}
    onUpdateTodoStatus={onUpdateTodoStatus}
    onDeleteTodo={onDeleteTodo}
  />, div)
})

test('Todo list matches snapshot no tasks', () => {
  const isShowAll= true
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { asFragment } = render(
    <TodoList 
      todos={[]}
      isShowAll={isShowAll}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo list matches snapshot only active tasks', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const isShowAll= true
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { asFragment } = render(
    <TodoList 
      todos={[todo]}
      isShowAll={isShowAll}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo list matches snapshot only completed tasks', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.COMPLETED,
    created_date: 'date'
  }
  const isShowAll= true
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { asFragment } = render(
    <TodoList 
      todos={[todo]}
      isShowAll={isShowAll}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo list matches snapshot both active and completed tasks', () => {
  const todo = [
    {
      id: 'testid',
      user_id: 'userid',
      content : 'content',
      status: TodoStatus.COMPLETED,
      created_date: 'date'
    },
    {
      id: 'testid',
      user_id: 'userid',
      content : 'content',
      status: TodoStatus.ACTIVE,
      created_date: 'date'
    }
  ]
  const isShowAll= true
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { asFragment } = render(
    <TodoList 
      todos={todo}
      isShowAll={isShowAll}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})