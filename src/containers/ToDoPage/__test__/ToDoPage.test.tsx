import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ToDoPage from "../ToDoPage";
import userEvent from "@testing-library/user-event";

// render
const renderComponent = () => {
  return render(<ToDoPage />);
};

//test case
describe("<ActionButton/>", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent();
    expect(wrapper.container).toMatchSnapshot();
  });
  it("should work on createTodo", () => {
    const wap = renderComponent();
    const inputElement = screen.getByPlaceholderText(
      /What need to be done?/i
    ) as HTMLInputElement;

    userEvent.type(inputElement, "Go Test Case");

    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const content = screen.getByTestId("TodoItem_content");
    expect(content.textContent).toContain("Go Test Case");

    const checked = screen.getByTestId("TodoItem_checkbox");
    userEvent.click(checked);
    expect(content).toHaveStyle("text-decoration-line: line-through");
  });

  it("should work on editTodo", () => {
    const wap = renderComponent();
    const inputElement = screen.getByPlaceholderText(
      /What need to be done?/i
    ) as HTMLInputElement;

    userEvent.type(inputElement, "Go Test Case New");

    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    wap.debug();
    const item = screen.getAllByTestId("TodoItem_content");
    userEvent.dblClick(item[1]);
    const editInput = screen.getByTestId("TodoItem_input");
    expect(editInput).toBeInTheDocument();
    userEvent.click(editInput);
    userEvent.type(editInput, " Edit");
    fireEvent.keyDown(editInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    wap.debug();
    expect(screen.getByText("Go Test Case New Edit")).toBeInTheDocument();
  });
});
