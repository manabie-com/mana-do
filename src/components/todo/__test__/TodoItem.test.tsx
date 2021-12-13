import React from 'react'
import ReactDOM from 'react-dom'
import TodoItem from '../TodoItem'
import { render, cleanup } from '@testing-library/react'
import { TodoStatus } from '../../../models/todo'

afterEach(cleanup)

test('Todo Item renders without crashing', () => {
  const div = document.createElement('div')
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = null
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  ReactDOM.render(
  <TodoItem 
    todo={todo} 
    editInputRef={editInputRef} 
    editTodoItem={editTodoItem} 
    setEditTodoItem={setEditTodoItem}
    onEditTodo={onEditTodo}
    onUpdateTodoStatus={onUpdateTodoStatus}
    onDeleteTodo={onDeleteTodo}  
  />, div)
})

test('Todo Item page matches snapshot no edit item', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = null
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { asFragment } = render(
    <TodoItem 
      todo={todo} 
      editInputRef={editInputRef} 
      editTodoItem={editTodoItem} 
      setEditTodoItem={setEditTodoItem}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}  
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo Item page matches snapshot item being edited', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = {...todo}
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { asFragment } = render(
    <TodoItem 
      todo={todo} 
      editInputRef={editInputRef} 
      editTodoItem={editTodoItem} 
      setEditTodoItem={setEditTodoItem}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}  
    />
  )
  const componentRender = asFragment()
  expect(componentRender).toMatchSnapshot()
})

test('Todo Item input checkbox is in the page', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = null
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { getByTestId } = render(
    <TodoItem 
      todo={todo} 
      editInputRef={editInputRef} 
      editTodoItem={editTodoItem} 
      setEditTodoItem={setEditTodoItem}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}  
    />
  )
  const todoItemCheckbox = getByTestId('todo-item-checkbox')

  expect(todoItemCheckbox).toBeInTheDocument()
})

test('Todo Item span is rendered when editTodoItem is null', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = null
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { getByTestId } = render(
    <TodoItem 
      todo={todo} 
      editInputRef={editInputRef} 
      editTodoItem={editTodoItem} 
      setEditTodoItem={setEditTodoItem}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}  
    />
  )
  const todoItemSpan = getByTestId('todo-item-span')

  expect(todoItemSpan).toBeInTheDocument()
})

test('Todo Item edit is rendered when editTodoItem is equal to current todo', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = {...todo}
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { getByTestId } = render(
    <TodoItem 
      todo={todo} 
      editInputRef={editInputRef} 
      editTodoItem={editTodoItem} 
      setEditTodoItem={setEditTodoItem}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}  
    />
  )
  const todoItemEdit = getByTestId('todo-item-edit')

  expect(todoItemEdit).toBeInTheDocument()
})

test('Todo Item delete is rendered', () => {
  const todo = {
    id: 'testid',
    user_id: 'userid',
    content : 'content',
    status: TodoStatus.ACTIVE,
    created_date: 'date'
  }
  const editInputRef = { current: null}
  const editTodoItem = null
  const setEditTodoItem = jest.fn()
  const onEditTodo = jest.fn()
  const onUpdateTodoStatus = jest.fn()
  const onDeleteTodo = jest.fn()

  const { getByTestId } = render(
    <TodoItem 
      todo={todo} 
      editInputRef={editInputRef} 
      editTodoItem={editTodoItem} 
      setEditTodoItem={setEditTodoItem}
      onEditTodo={onEditTodo}
      onUpdateTodoStatus={onUpdateTodoStatus}
      onDeleteTodo={onDeleteTodo}  
    />
  )
  const todoItemEdit = getByTestId('todo-item-delete')

  expect(todoItemEdit).toBeInTheDocument()
})
