import React from "react";
import ToDoPage from "./ToDoPage";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("test component TodoPage render", () => {
  const component = render(<ToDoPage />);
  const input = component.getByTestId("todo-input");
  expect(input.textContent).toBe("");
});

test("test value of input when change value", () => {
  const component = render(<ToDoPage />);
  const input = component.getByTestId("todo-input") as HTMLInputElement;
  fireEvent.change(input, {
    target: {
      value: "duytest",
    },
  });
  expect(input.value).toBe("duytest");
});
