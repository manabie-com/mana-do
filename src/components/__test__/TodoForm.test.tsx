import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TodoForm from "../TodoForm";

afterEach(cleanup);

describe("<Test TodoForm/>", () => {
  it("should render input element", () => {
    render(<TodoForm />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type into input", () => {
    render(<TodoForm />);
    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.click(inputElement);
    userEvent.type(inputElement, "Shopping");
    expect(inputElement.value).toBe("Shopping");
  });
});
