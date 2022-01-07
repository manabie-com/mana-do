import React from "react";
import { expect, test, describe } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoInput, { TodoInputProps } from "../index";

const mockedOnEnter = jest.fn();

describe("TodoInput snapshots", () => {
  test("should render with empty text", () => {
    const props: TodoInputProps = {
      defaultValue: "",
      onEnter: mockedOnEnter,
      autoFocus: false,
    };
    const { container } = render(<TodoInput {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render with default text", () => {
    const props: TodoInputProps = {
      defaultValue: "Do homework",
      onEnter: mockedOnEnter,
      autoFocus: false,
    };
    const { container } = render(<TodoInput {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("TodoInput functions", () => {
  test("should have correct default value of input", () => {
    const props: TodoInputProps = {
      defaultValue: "Do homework",
      onEnter: mockedOnEnter,
      autoFocus: false,
    };
    render(<TodoInput {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("Do homework");
  });

  test("should be able to type in input", () => {
    const props: TodoInputProps = {
      defaultValue: "",
      onEnter: mockedOnEnter,
      autoFocus: false,
    };
    render(<TodoInput {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Go to market" } });
    expect(inputElement.value).toBe("Go to market");
  });

  test("should have empty value when press Enter", () => {
    const props: TodoInputProps = {
      defaultValue: "",
      onEnter: mockedOnEnter,
      autoFocus: false,
    };
    render(<TodoInput {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "Go to market" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });
    expect(inputElement.value).toBe("");
  });

  test("should focus when autofocus is true", () => {
    const props: TodoInputProps = {
      defaultValue: "",
      onEnter: mockedOnEnter,
      autoFocus: true,
    };
    render(<TodoInput {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(document.activeElement).toEqual(inputElement);
  });
});
