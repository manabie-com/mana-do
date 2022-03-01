import { fireEvent, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import AddTodo from "../AddTodo";

test("Change value input work correctly", () => {
  const comp = render(<AddTodo />);
  const inputEl = comp.getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "",
    },
  });

  expect(inputEl.value).toBe("");
});
