import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { TodoStatus } from '../../models/todo';

import TodoItem from './TodoItem';

import {
  DELETE_TODO,
  UPDATE_TODO_CONTENT, 
  UPDATE_TODO_STATUS} from '../../store/actions'

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers()
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers()
});

const data = {
  content: "No Content",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: "123ABC",
  user_id: "firstUser",
};

it("render todo item with content", () => {
  expect(typeof data).toBe("object")

  act(() => {
    render(<TodoItem data={data} showing />, container);
  });

  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem.querySelector("[data-testid=todo-item-content]").textContent).toEqual("No Content");
});

it("render todo item & click to switch editting mode", () => {
  expect(typeof data).toBe("object")

  let dispatch = jest.fn()
  
  act(() => {
    render(<TodoItem data={data} showing dispatch={dispatch}/>, container);
  });
  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem.querySelector("[data-testid=todo-item-content]")).not.toBe(null);
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).toBe(null);

  act(()=>{
    todoitem.querySelector("[data-testid=todo-item-content]").dispatchEvent(new MouseEvent('dblclick', {bubbles: true}))
  })
  expect(todoitem.querySelector("[data-testid=todo-item-content]")).toBe(null)
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).not.toBe(null);

  todoitem.querySelector("[data-testid=todo-item-input]").value = "Hi, ok"
  act(()=>{
    todoitem.querySelector("[data-testid=todo-item-input]").dispatchEvent(new InputEvent('blur', {bubbles: true}))
  })

  expect(todoitem.querySelector("[data-testid=todo-item-content]")).not.toBe(null);
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).toBe(null);
  expect(dispatch).toBeCalledTimes(0)
});


it("render todo item & click to switch editting mode & enter to dispatch edit action", () => {
  
  expect(typeof data).toBe("object")

  let dispatch = jest.fn()
  
  act(() => {
    render(<TodoItem data={data} showing dispatch={dispatch}/>, container);
  });
  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem.querySelector("[data-testid=todo-item-content]")).not.toBe(null);
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).toBe(null);

  act(()=>{
    todoitem.querySelector("[data-testid=todo-item-content]").dispatchEvent(new MouseEvent('dblclick', {bubbles: true}))
  })
  expect(todoitem.querySelector("[data-testid=todo-item-content]")).toBe(null)
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).not.toBe(null);

  todoitem.querySelector("[data-testid=todo-item-input]").value = "Hi, ok"
  act(()=>{
    todoitem.querySelector("[data-testid=todo-item-input]").dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}))
  })
  // expect(MockActions.updateTodoContent).toBeCalledWith("123ABC","Hi, ok")
  expect(dispatch).toBeCalledWith(expect.objectContaining({type: UPDATE_TODO_CONTENT, payload:{todoId: "123ABC", content: "Hi, ok"}}))
});

it("change todo item status", () => {
  
  expect(typeof data).toBe("object")

  let dispatch = jest.fn()
  
  act(() => {
    render(<TodoItem data={data} showing dispatch={dispatch}/>, container);
  });
  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem.querySelector("[data-testid=todo-item-content]")).not.toBe(null);
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).toBe(null);

  act(()=>{
    todoitem.querySelector("[data-testid=checkbox]").dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  // expect(MockActions.updateTodoContent).toBeCalledWith("123ABC","Hi, ok")
  expect(dispatch).toBeCalledWith(expect.objectContaining({type: UPDATE_TODO_STATUS, payload: {checked: true, todoId: "123ABC"}}))
});

it("delete todo item", () => {
  
  expect(typeof data).toBe("object")

  let dispatch = jest.fn()
  
  act(() => {
    render(<TodoItem data={data} showing dispatch={dispatch}/>, container);
  });
  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem.querySelector("[data-testid=todo-item-content]")).not.toBe(null);
  expect(todoitem.querySelector("[data-testid=todo-item-input]")).toBe(null);

  act(()=>{
    todoitem.querySelector("[data-testid=todo-item-delete]").dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  // expect(MockActions.updateTodoContent).toBeCalledWith("123ABC","Hi, ok")
  expect(dispatch).toBeCalledWith(expect.objectContaining({type: DELETE_TODO, payload: "123ABC"}))
});
