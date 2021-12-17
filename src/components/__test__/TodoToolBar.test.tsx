import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoToolBar from "../TodoToolBar";

const mockSetShowing = jest.fn();

afterEach(cleanup);

describe("<Test TodoToolBar/>", () => {
  it("should render TodoList", () => {
    render(<TodoToolBar todos={[]} setShowing={mockSetShowing} />);
    const todoToollBar = screen.getByTestId("todo-toolbar");

    expect(todoToollBar).toBeInTheDocument();
  });

  it("should render Action__btn", () => {
    render(<TodoToolBar todos={[]} setShowing={mockSetShowing} />);
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements.length).toEqual(4);
  });

  it("should be clickable correctly", () => {
    render(<TodoToolBar todos={[]} setShowing={mockSetShowing} />);
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((x) => expect(x).not.toBeDisabled());
  });
});
