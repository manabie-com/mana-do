import React from "react";
import Todo from "../pages/Todo";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("Todo Page", () => {
  test("has a header TodoMatic", () => {
    const component = render(<Todo />);
    const headerEl = component.getByText("TodoMatic");

    expect(headerEl).toBeInTheDocument();
  });

  test("create a todo on page", async () => {
    render(<Todo />);
    const inputText = screen.getByTestId("todoCreate");

    userEvent.type(inputText, "Hello world 123");
    await fireEvent.keyDown(inputText, { key: "Enter", charCode: 13 });
    const text = screen.queryByText("Hello world 123");
    expect(text).toBeNull();
    await waitFor(() => {
      screen.debug();
    });
  });
});
