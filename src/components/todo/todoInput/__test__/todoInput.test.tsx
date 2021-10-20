import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import TodoInput from "../index";

const getMockProps = (
  data = {
    value: "New Todo",
    placeholder: "What need to be done?",
    onKeyDown: jest.fn(),
    onChange: jest.fn(),
  }
) => data;

describe("TodoInput", () => {
  afterEach(cleanup);

  it("test render todo input", () => {
    const mockProps = getMockProps();

    const { container } = render(<TodoInput {...mockProps} />);

    const inputEl = container.querySelector("input") as HTMLInputElement;

    expect(inputEl.value).toBe(mockProps.value);

    expect(inputEl).toHaveAttribute("placeholder", mockProps.placeholder);
  });

  it("test keydown event", () => {
    const mockProps = getMockProps();

    const { container } = render(<TodoInput {...mockProps} />);

    const inputEl = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(inputEl, {
      target: {
        value: "Content",
      },
    });
    fireEvent.keyDown(inputEl, {
      key: "Enter",
      code: 13,
      charCode: 13,
    });

    expect(mockProps.onChange).toBeCalled();

    expect(mockProps.onKeyDown).toBeCalled();
  });
});
