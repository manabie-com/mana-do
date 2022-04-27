import React from "react";
import TodoItem from "../index";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("test content of todo content in 1st render", () => {
  const todo = [
    {
      content: "duytest",
      created_date: "2022-04-26T16:13:33.603Z",
      id: "h31Y9EGBT",
      status: "ACTIVE",
      user_id: "firstUser",
    },
  ];
  const component = render(
    <TodoItem
      todo={todo}
      onDeleteTodo={() => {}}
      onEditTodo={() => {}}
      onUpdateTodoStatus={() => {}}
    />
  );
  const input = component.getByTestId("todo-content");
  expect(input.textContent).toBe("");
});

test("check status of checkbox", () => {
  const todo = [
    {
      content: "duytest",
      created_date: "2022-04-26T16:13:33.603Z",
      id: "h31Y9EGBT",
      status: "ACTIVE",
      user_id: "firstUser",
    },
  ];
  const component = render(
    <TodoItem
      todo={todo}
      onDeleteTodo={() => {}}
      onEditTodo={() => {}}
      onUpdateTodoStatus={() => {}}
    />
  );
  const input = component.getByTestId("status-checkbox") as HTMLInputElement;
  expect(input.checked).toBe(false);
});
