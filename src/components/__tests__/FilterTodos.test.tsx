import {  render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { TodoStatus } from "../../models/todo";
import { FilterTodos } from "../FilterTodos";

const initialTodos = [
  {
    id: "1",
    content: "New todo 1",
    user_id: "newUser",
    created_date: new Date().toUTCString(),
    status: TodoStatus.ACTIVE,
  },
  {
    id: "2",
    content: "New todo 2",
    user_id: "newUser",
    created_date: new Date().toUTCString(),
    status: TodoStatus.ACTIVE,
  },
  {
    id: "3",
    content: "Completed todo",
    user_id: "newUser",
    created_date: new Date().toUTCString(),
    status: TodoStatus.COMPLETED,
  },
];

describe("FilterTodos", () => {
  test("should show all todos by default", () => {
    const rr = render(
      <FilterTodos
        dispatch={() => {}}
        showing="ALL"
        todos={initialTodos}
        setShowing={() => {}}
      />
    );

    expect(rr.getByRole("checkbox")).toBeInTheDocument();
    expect(rr.getByText("All")).toBeInTheDocument();
    expect(rr.getByText("All")).toHaveClass("active");
  });

  test("should hide all checkbox when todos list empty", () => {
    const rr = render(
      <FilterTodos
        dispatch={() => {}}
        showing="ALL"
        todos={[]}
        setShowing={() => {}}
      />
    );

    expect(rr.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(rr.getByText("All")).toBeInTheDocument();
    expect(rr.getByText("All")).toHaveClass("active");
  });

  test("should active the `active` button", () => {
    const rr = render(
      <FilterTodos
        dispatch={() => {}}
        showing={TodoStatus.ACTIVE}
        todos={initialTodos}
        setShowing={() => {}}
      />
    );

    expect(rr.getByText("Active")).toHaveClass("active");
  });
  
  test("should active the `completed` button", () => {
    const rr = render(
      <FilterTodos
        dispatch={() => {}}
        showing={TodoStatus.COMPLETED}
        todos={initialTodos}
        setShowing={() => {}}
      />
    );

    expect(rr.getByText("Completed")).toHaveClass("active");
  });
});
