import React from "react";
import { cleanup, render } from "@testing-library/react";
import Button from "../index";
import { ColorButton, TypeButton } from "../IButtonProps";
import userEvent from "@testing-library/user-event";

const getMockProps = (
  data = {
    text: "Test Label",
    color: "red" as ColorButton,
    type: "button" as TypeButton,
    onClick: jest.fn(),
  }
) => data;

describe("Button", () => {
  afterEach(cleanup);

  it("test props of button", () => {
    const mockProps = getMockProps();

    const { container } = render(<Button {...mockProps} />);

    const btnEl = container.querySelector("button") as HTMLButtonElement;

    expect(btnEl).toHaveTextContent(mockProps.text);

    expect(container.firstChild).toHaveClass(`btn--${mockProps.color}`);

    expect(btnEl).toHaveAttribute("type", "button");
  });

  it("test when not passing color props", () => {
    const mockProps = getMockProps();

    const { color, ...newProps } = mockProps;

    const { container } = render(<Button {...newProps} />);

    const btnEl = container.querySelector("button") as HTMLButtonElement;

    expect(container.firstChild).toHaveClass("btn--green");

    expect(btnEl).toHaveAttribute("type", "button");
  });

  it("test onClick fire when click button", () => {
    const mockProps = getMockProps();

    const { container } = render(<Button {...mockProps} />);

    const btnEl = container.querySelector("button") as HTMLButtonElement;

    userEvent.click(btnEl);

    expect(mockProps.onClick).toBeCalled();
  });
});
