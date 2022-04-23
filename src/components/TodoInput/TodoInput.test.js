import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoInput from "./TodoInput";

const setup = () => {
  const component = render(<TodoInput />);
  const input = component.getByLabelText("input");
  return {
    input,
    ...component,
  };
};

test("renders a empty input", () => {
  const { input } = setup();
  expect(input).toHaveValue("");
  expect(input).toHaveProperty("placeholder", "What need to be done?");
});

test("should allow value is change", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "Feed the cat" } });
  expect(input.value).toBe("Feed the cat");
});
