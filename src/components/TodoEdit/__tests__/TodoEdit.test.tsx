import React from "react";
import { expect, test, describe } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoEdit, { TodoEditProps } from "../index";
import { isPropertySignature } from "typescript";

const mockedOnSubmit = jest.fn();
const mockedOnCloseEdit = jest.fn();

const defaultProps: TodoEditProps = {
  value: "",
  onSubmit: mockedOnSubmit,
  onCloseEdit: mockedOnCloseEdit,
};

describe("TodoEdit Snapshots", () => {
  test("should render snapshot with no text", () => {
    const { container } = render(<TodoEdit {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should render snapshot with some text", () => {
    const props: TodoEditProps = { ...defaultProps, value: "shopping" };
    const { container } = render(<TodoEdit {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("TodoEdit functions", () => {
  test("should render corrent text of value", () => {
    const props: TodoEditProps = { ...defaultProps, value: "shopping" };
    render(<TodoEdit {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputElement.value).toBe("shopping");
  });

  test("should auto focus the input", () => {
    const props: TodoEditProps = { ...defaultProps, value: "shopping" };
    render(<TodoEdit {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    expect(document.activeElement).toEqual(inputElement);
  });

  test("should fire onSubmit event when press Enter", () => {
    const props: TodoEditProps = { ...defaultProps, value: "shopping" };
    render(<TodoEdit {...props} />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.keyDown(inputElement, { key: "Enter" });
    expect(mockedOnSubmit).toBeCalled();
  });
});
