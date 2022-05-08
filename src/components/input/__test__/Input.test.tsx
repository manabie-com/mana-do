import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { getElementByTestId } from "utils/testUtils";
import Input, { IInputProps } from "../Input";

const onKeyDownAction = jest.fn();

const renderComponent = ({ ...props }: IInputProps): RenderResult => {
  return render(<Input {...props} />);
};

describe("<Input /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({ name: "todo-input" });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render correcly", () => {
    renderComponent({ name: "todo-input" });
    const element = getElementByTestId("input");
    expect(element).toBeInTheDocument();
  });

  it("should render a input with the default class", () => {
    renderComponent({ name: "todo-input" });
    const element = getElementByTestId("input");
    expect(element).toHaveClass("input-todo");
  });
});

describe("<Input /> interacting", () => {
  it("should render a input clickable", () => {
    renderComponent({ name: "todo-input" });
    const element = getElementByTestId("input");
    expect(element).not.toBeDisabled();
  });

  it("should handle onKeydown", () => {
    renderComponent({
      name: "todo-input",
      onKeyDown: onKeyDownAction,
    });
    const element = getElementByTestId("input");

    fireEvent.keyDown(element, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(onKeyDownAction).toHaveBeenCalled();
  });
});
