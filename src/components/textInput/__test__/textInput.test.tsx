import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import TextInput from "../index";

const getMockProps = (
  data = {
    label: "User id",
    id: "userId",
    name: "userId",
    value: "firstUser",
    onChange: jest.fn(),
    placeholder: "User id",
  }
) => data;

describe("TextInput", () => {
  afterEach(cleanup);

  it("test render text input", () => {
    const mockProps = getMockProps();

    const { container } = render(<TextInput {...mockProps} />);

    const labelEl = container.querySelector("label") as HTMLLabelElement;
    const inputEl = container.querySelector("input") as HTMLInputElement;

    expect(labelEl).toHaveTextContent(mockProps.label);

    expect(labelEl).toHaveAttribute("for", mockProps.id);

    expect(inputEl.value).toBe(mockProps.value);

    expect(inputEl).toHaveAttribute("id", mockProps.id);

    expect(inputEl).toHaveAttribute("name", mockProps.name);

    expect(inputEl).toHaveAttribute("placeholder", mockProps.placeholder);
  });
});
