import React from "react";
import Checkbox from "./../Checkbox";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const propTest = {
  onChange: jest.fn(),
  checked: true,
  label: "Test Label",
  name: "test",
  id: "test",
  fullWidth: true,
};

let container: HTMLElement;
let labelEl: HTMLElement;

beforeEach(() => {
  container = render(<Checkbox {...propTest} />).container;
  labelEl = container.querySelector("label") as HTMLLabelElement;
});

test("test props of checkbox", () => {
  const checkboxEl = container.querySelector("input") as HTMLInputElement;

  // Test checked props
  expect(checkboxEl?.checked).toBe(propTest.checked);

  // Test fullWidth props
  expect(labelEl).toHaveClass("w-100");

  // Test label props
  const labelInputEl = container.querySelector(
    ".Checkbox__label"
  ) as HTMLSpanElement;
  expect(labelInputEl).toHaveTextContent(propTest.label);
});

test("test optional props of checkbox", () => {
  const { label, fullWidth, ...optionalProps } = propTest;
  const { container } = render(<Checkbox {...optionalProps} />);
  const labelEl = container.querySelector("label") as HTMLLabelElement;

  // Test not label props
  const labelInputEl = container.querySelector(".Checkbox__label");
  expect(labelInputEl).toBeNull();

  // Test not fullWidth props
  expect(labelEl).not.toHaveClass("w-100");
});

test("test onChange fire when click label of checkbox", () => {
  userEvent.click(labelEl);
  expect(propTest.onChange).toBeCalled();
});
