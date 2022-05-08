import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { getElementByTestId } from "utils/testUtils";
import Checkbox, { ICheckboxProps } from "../Checkbox";

const onChangeAction = jest.fn();

const renderComponent = ({ ...props }: ICheckboxProps): RenderResult => {
  return render(<Checkbox {...props} />);
};

describe("<Checkbox /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({
      onChange: onChangeAction,
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render correcly", () => {
    renderComponent({
      onChange: onChangeAction,
    });
    const element = getElementByTestId("checkbox");
    expect(element).toBeInTheDocument();
  });

  it("should render a checkbox with the default class", () => {
    renderComponent({
      onChange: onChangeAction,
    });
    const element = getElementByTestId("checkbox");
    expect(element).toHaveClass("cbx-todo");
  });
});

describe("<Checkbox /> interacting", () => {
  it("should render a checkbox clickable", () => {
    renderComponent({
      onChange: onChangeAction,
    });
    const element = getElementByTestId("checkbox");
    expect(element).not.toBeDisabled();
  });

  it("should handle onChange when clicked", () => {
    renderComponent({
      onChange: onChangeAction,
    });
    const element = getElementByTestId("checkbox");
    userEvent.click(element);
    expect(onChangeAction).toHaveBeenCalled();
  });
});
