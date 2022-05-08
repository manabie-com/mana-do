import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { getElementByTestId } from "utils/testUtils";
import Button, { IButtonProps } from "../Button";

const onClickAction = jest.fn();

const renderComponent = ({ ...props }: IButtonProps): RenderResult => {
  return render(<Button {...props} />);
};

describe("<Button /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({
      onClick: onClickAction,
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render correcly", () => {
    renderComponent({
      onClick: onClickAction,
    });
    const element = getElementByTestId("button");
    expect(element).toBeInTheDocument();
  });

  it("should render a button with the default class", () => {
    renderComponent({
      onClick: onClickAction,
    });
    const element = getElementByTestId("button");
    expect(element).toHaveClass("btn-todo");
  });
});

describe("<Button /> interacting", () => {
  it("should render a button clickable", () => {
    renderComponent({
      onClick: onClickAction,
    });
    const element = getElementByTestId("button");
    expect(element).not.toBeDisabled();
  });

  it("should handle onClick when clicked", () => {
    renderComponent({
      onClick: onClickAction,
    });
    const element = getElementByTestId("button");
    userEvent.click(element);
    expect(onClickAction).toHaveBeenCalled();
  });
});
