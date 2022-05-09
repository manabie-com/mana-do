import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import shortid from "shortid";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import "jest-styled-components";
import { Todo, TodoStatus } from "../../models/todo";
import ToDoPage from "../../components/ToDoPage";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // @ts-ignore
  unmountComponentAtNode(container);
  container?.remove();
  container = null;
});

const todo: Todo = {
  content: "fake content 1",
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "userId1",
  number_id: 1,
};

const store = configureMockStore()({
  todos: [todo],
});

it("should render todo item", async () => {
  act(() => {
    render(
      <Provider store={store}>
        <ToDoPage />
      </Provider>,
      container
    );
  });
  const checkbox = container?.querySelector(
    "input[type=checkbox]"
  ) as HTMLInputElement;
  const span = container?.querySelector(".ToDo__item span");

  expect(checkbox.checked).toEqual(todo.status === TodoStatus.COMPLETED);
  expect(span?.textContent).toEqual(todo.content);

  const detail = container?.querySelector(".ToDo__item span");

  act(() => {
    detail?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const inputClear = container?.querySelector(".clear__all");
  act(() => {
    inputClear?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const inputDelete = container?.querySelector(".Todo__delete");
  act(() => {
    inputDelete?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  let listData = container?.querySelector(".ToDo__item");
  expect(listData).toBeTruthy();
});
