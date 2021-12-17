import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

afterEach(cleanup);

describe("Test <TodoList />", () => {
  it("should render TodoList", () => {
    render(<TodoList todos={[]} showing="ALL" />);
    const todoList = screen.getByTestId("todo-list");

    expect(todoList).toBeInTheDocument();
  });
});
