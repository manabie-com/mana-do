import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TodoList from "./TodoList";
import mockData from '../mock/todos';

describe("<TodoList /> tests", () => {
  it("should show title of todos", () => {
    const screen = render(
      <TodoList
        todos={mockData}
        deleteTodo={jest.fn}
        updateTodo={jest.fn}
        updateTodoStatus={jest.fn}
      />
    );

    mockData.forEach((d) =>
      expect(screen.getByText(d.content)).toBeInTheDocument()
    );
  });
});