import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ToDoPage from "../page/ToDoPage";
afterEach(cleanup);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("renders todo Page", () => {
  const { getByPlaceholderText, getByText } = render(<ToDoPage />);
  // check text
  getByText("TODO LIST");
  getByText("0 of 0 task done");
  getByPlaceholderText("What need to be done?");
  // check button
  getByText("All").closest("button");
  getByText("Active").closest("button");
  getByText("Completed").closest("button");
  getByText("Clear All").closest("button");
});

test("add todo with whitespace input", async () => {
  const { getByText } = render(<ToDoPage />);
  const inputElement: HTMLInputElement = screen.getByPlaceholderText(
    /What need to be done ?/i
  );
  fireEvent.change(inputElement, { target: { value: " " } });
  expect(inputElement.value).toBe(" ");
  fireEvent.keyDown(inputElement, { key: "Enter", charCode: 13 });
  // check text
  getByText("No Data");
});

test("add todo", async () => {
  const { getByText } = render(<ToDoPage />);
  const inputElement: HTMLInputElement = screen.getByPlaceholderText(
    /What need to be done ?/i
  );
  fireEvent.change(inputElement, { target: { value: "Go To Shopping" } });
  expect(inputElement.value).toBe("Go To Shopping");
  // press Enter
  fireEvent.keyDown(inputElement, { key: "Enter", charCode: 13 });
  // check text
  getByText("Go To Shopping");
});

test("edit todo", async () => {
  const { getByText } = render(<ToDoPage />);
  // find todo
  const taskValue = getByText("Go To Shopping");
  // double click to edit todo
  fireEvent.doubleClick(taskValue);
  const inputEditElement: HTMLInputElement =
    screen.getByDisplayValue(/Go To Shopping/i);
  // change value
  fireEvent.change(inputEditElement, { target: { value: "Go To School" } });
  expect(inputEditElement.value).toBe("Go To School");
  // press enter
  fireEvent.keyDown(inputEditElement, { key: "Enter", charCode: 13 });
  // check text
  getByText("Go To School");
});
