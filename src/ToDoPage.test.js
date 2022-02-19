import React, { useReducer } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { TodoStatus } from "./models/todo";

import TodoItem from "./components/TodoItem/TodoItem";
import ToDoPage from "./ToDoPage";
import reducer from "./store/reducer";
import { toggleAllTodos } from "./store/actions";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

// jest.mock("./TodoItem", ()=>{
//   return (props)=>{
//     <div id={props.data.id}>TodoItem-{props.data.id}</div>
//   }
// })

const item1 = {
  content: "No Content",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: "1",
  user_id: "firstUser",
};
const item2 = {
  content: "No Content 2",
  created_date: new Date().toISOString(),
  status: TodoStatus.COMPLETED,
  id: "2",
  user_id: "firstUser",
};

const activeItems = [item1];

const completedItems = [item2];

const data = [item1, item2];

it("render todo page", () => {
  expect(typeof data).toBe("object");

  act(() => {
    render(<ToDoPage />, container);
  });

  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem).toEqual(null);
});

it("render todo page with 2 items & filter by status", () => {
  localStorage.setItem("todoState", JSON.stringify({ todos: data }));

  expect(typeof data).toBe("object");

  act(() => {
    render(<ToDoPage />, container);
  });

  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem).not.toEqual(null);

  const todolist = document.querySelector("[data-testid=todo-list]");
  let items = todolist.querySelectorAll("[data-testid=todo-item]");

  expect(
    items[0].querySelector("[data-testid=todo-item-content]").textContent
  ).toEqual(data[0].content);
  expect(
    items[1].querySelector("[data-testid=todo-item-content]").textContent
  ).toEqual(data[1].content);

  todolist
    .querySelector("[data-testid=todo-show-active]")
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));

  setTimeout(() => {
    expect(
      items[0].querySelector("[data-testid=todo-item-content]").textContent
    ).toEqual(activeItems[0].content);
    todolist
      .querySelector("[data-testid=todo-show-completed]")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    setTimeout(() => {
      expect(
        items[0].querySelector("[data-testid=todo-item-content]").textContent
      ).toEqual(completedItems[0].content);
    }, 100);
  }, 100);
});

it("clear all todo", () => {
  localStorage.setItem("todoState", JSON.stringify({ todos: data }));

  expect(typeof data).toBe("object");

  act(() => {
    render(<ToDoPage />, container);
  });

  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem).not.toEqual(null);

  const todolist = document.querySelector("[data-testid=todo-list]");
  todolist
    .querySelector("[data-testid=todo-clear-all]")
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  setTimeout(
    () =>
      expect(todolist.querySelectorAll("[data-testid=todo-item]").length).toBe(
        0
      ),
    100
  );
});

it("toggle all todo", () => {
  localStorage.setItem("todoState", JSON.stringify({ todos: data }));

  expect(typeof data).toBe("object");

  act(() => {
    render(<ToDoPage />, container);
  });

  const todoitem = document.querySelector("[data-testid=todo-item]");
  expect(todoitem).not.toEqual(null);

  const todolist = document.querySelector("[data-testid=todo-list]");
  todolist
    .querySelector("[data-testid=todo-toggle-all]")
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  setTimeout(
    () =>
      expect(
        todolist.querySelectorAll("[data-testid=todo-item]")[0].classList
      ).not.toContain("active"),
    100
  );
});

// localStorage.setItem("todoState", JSON.stringify(data));
