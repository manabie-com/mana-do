import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import "@testing-library/jest-dom";
import Input from "component/Todo/InputWithErrorCheck";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Todo Form", () => {
  let input: any;
  let form: any;
  let mockSubmit = jest.fn();
  beforeEach(() => {
    render(<Input onSubmit={mockSubmit} />);
    input = screen.getByTestId("todo-input");
    form = screen.getByTestId("todo-form");
  });

  test("Form and input should exist", () => {
    expect(input).toBeTruthy();
    expect(form).toBeTruthy();
  });
  test("input is changable", () => {
    const testPhrase = "hello world";

    userEvent.type(input, testPhrase);
    expect(input.value).toBe(testPhrase);
  });
});

describe("Todo Form", () => {
  test("should not allow empty input onSubmit", () => {
    const mockSubmit = jest.fn();
    render(<Input onSubmit={mockSubmit} />);
    const form = screen.getByTestId("todo-form");
    const input = screen.getByTestId("todo-input");
    // if input value is empty => not submitting

    userEvent.type(input, "");
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalledTimes(0);
    // error text should show up
    const errorText = screen.getByTestId("input-error-msg");
    expect(errorText).toBeInTheDocument();

    // if input value has value => submitting
    // also error text should disappear
    userEvent.type(input, "test");
    expect(errorText).not.toBeInTheDocument();
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test("if opening from modal, input value should be taken from active todo", () => {
    const mockSubmit = jest.fn();
    const activeTodoTextMock = "hello world";
    render(
      <Input onSubmit={mockSubmit} updatedTodoValue={activeTodoTextMock} />
    );
    const input = screen.getByTestId("todo-input");
    expect(input.value).toBe(activeTodoTextMock);
  });
});
