import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoPage from './TodoPage'
import shortid from 'shortid'
import storageService from '../service/storageService'
import {TodoStatus} from '../models/todo'

const todoList = [
  {
    content: "abc",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser'
  },
  {
    content: "xyz",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser'
  },
]

test("rendering todo list", async () => {
  storageService.todoList = todoList
  render(<TodoPage />);
  await waitFor(() => screen.getByText("xyz"))
  expect(screen.getByText("xyz")).toBeInTheDocument()
  expect(screen.getByText("abc")).toBeInTheDocument()
  storageService.todoList = undefined
})

test("Create new todo item", async () => {
  render(<TodoPage />);
  userEvent.type(screen.getByPlaceholderText("What need to be done?"), "def{enter}")
  await waitFor(() => screen.getByText("def"))
  expect(screen.getByText("def")).toBeInTheDocument()
  storageService.todoList = undefined
})

test("Edit todo item", async () => {
  storageService.todoList = todoList
  render(<TodoPage />);
  //edit abc -> aaa
  await waitFor(() => screen.getByText("abc"))
  userEvent.dblClick(screen.getByText("abc"))
  userEvent.type(
    screen.getByPlaceholderText("Edit todo content?"), 
    "{backspace}{backspace}{backspace}aaa{enter}"
  )
  await waitFor(() => screen.getByText("aaa"))
  expect(screen.getByText("aaa")).toBeInTheDocument()
  const oldValue = screen.queryByText("abc")
  const input = screen.queryByPlaceholderText("Edit todo content?")
  expect(oldValue).not.toBeInTheDocument()
  expect(input).not.toBeInTheDocument()
  storageService.todoList = undefined
})

const todoList2 = [
  {
    content: "abc",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser'
  },
]

test("Delete todo item", async () => {
  storageService.todoList = todoList2
  render(<TodoPage />);
  //delete abc
  await waitFor(() => screen.getByText("abc"))
  userEvent.click(screen.getByText("X"))
  await waitFor( () => {} )
  const oldValue = screen.queryByText("abc")
  expect(oldValue).not.toBeInTheDocument()
  storageService.todoList = undefined
})

const todoList3 = [
  {
    content: "abc",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser'
  },
  {
    content: "xyz",
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: 'firstUser'
  },
]

test("Delete all todo item", async () => {
  storageService.todoList = todoList3
  render(<TodoPage />);
  await waitFor(() => screen.getByText("xyz"))
  userEvent.click(screen.getByText("Clear all todos"))
  await waitFor( () => {} )
  const oldValue1 = screen.queryByText("abc")
  const oldValue2 = screen.queryByText("xyz")
  expect(oldValue1).not.toBeInTheDocument()
  expect(oldValue2).not.toBeInTheDocument()
  storageService.todoList = undefined
})