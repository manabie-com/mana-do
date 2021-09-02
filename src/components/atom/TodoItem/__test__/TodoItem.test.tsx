import React from "react";
import TodoItem from "./../TodoItem";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { TodoStatus } from "models/todo";
import { isTodoCompleted } from "utils";
import { ToDoPageContext } from "components/organism/Todo/hooks";
import { deleteTodo, updateTodoContent } from "actions/TodoListAction";

const todoExample = {
  id: "todo",
  user_id: "user_id",
  content: "content",
  status: TodoStatus.ACTIVE,
  created_date: new Date().toISOString(),
};

let container: HTMLElement;

const contextValue = {
  dispatch: jest.fn(),
};

beforeEach(() => {
  container = render(
    <ToDoPageContext.Provider value={contextValue}>
      <TodoItem todo={todoExample} />
    </ToDoPageContext.Provider>
  ).container;
});

test("test checkbox of TodoItem", () => {
  const checked = isTodoCompleted(todoExample);
  const checkboxEl = container.querySelector(
    "input[type=checkbox]"
  ) as HTMLInputElement;
  expect(checkboxEl.checked).toBe(checked);
});

test("test click update btn", () => {
  let editBtn, deleteBtn, inputEl, content;

  editBtn = container.querySelector(".Todo__action--edit") as HTMLButtonElement;
  // deleteBtn = container.querySelector(".Todo__action--delete") as HTMLButtonElement;

  // Test render on update content
  userEvent.click(editBtn);
  deleteBtn = container.querySelector(
    ".Todo__action--delete"
  ) as HTMLButtonElement;
  inputEl = container.querySelector(".Todo__input") as HTMLInputElement;
  content = container.querySelector(".Checkbox__label") as HTMLElement;
  expect(deleteBtn).toBeNull();
  expect(inputEl).not.toBeNull();

  // Test enter empty input content
  fireEvent.change(inputEl, {
    target: {
      value: "",
    },
  });
  fireEvent.keyPress(inputEl, { key: "Enter", code: 13, charCode: 13 });

  expect(contextValue.dispatch).not.toBeCalledWith(
    updateTodoContent(todoExample.id, "Content updated")
  );

  // Test enter input content
  fireEvent.change(inputEl, {
    target: {
      value: "Content updated",
    },
  });
  fireEvent.keyPress(inputEl, { key: "Enter", code: 13, charCode: 13 });
  inputEl = container.querySelector(".Todo__input") as HTMLInputElement;
  content = container.querySelector(".Checkbox__label") as HTMLElement;
  expect(inputEl).toBeNull();
  expect(contextValue.dispatch).toBeCalledWith(
    updateTodoContent(todoExample.id, "Content updated")
  );
  expect(content).not.toBeNull();

  // Test clickOutside input content
  editBtn = container.querySelector(".Todo__action--edit") as HTMLButtonElement;
  userEvent.click(editBtn);
  inputEl = container.querySelector(".Todo__input") as HTMLInputElement;
  fireEvent.change(inputEl, {
    target: {
      value: "Content updated",
    },
  });
  fireEvent.click(window);
  expect(contextValue.dispatch).toBeCalledWith(
    updateTodoContent(todoExample.id, "Content updated")
  );
  expect(content).not.toBeNull();
});

test("test click delete btn", () => {
  let deleteBtn;
  deleteBtn = container.querySelector(
    ".Todo__action--delete"
  ) as HTMLButtonElement;
  userEvent.click(deleteBtn);
  expect(contextValue.dispatch).toBeCalledWith(deleteTodo(todoExample.id));
});
