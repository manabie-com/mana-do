import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CreateTodoForm from "./CreateTodoForm";

describe("<CreateTodoForm /> tests", () => {
  it("should show input and button create todo", () => {
    const screen = render(
      <CreateTodoForm
        createTodo={jest.fn}
      />
    );

    const inputEl = screen.getByTestId('input-create-todo');
    const buttonEl = screen.getByTestId('button-create-todo');

    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });
});