import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Toolbar from "component/Todo/Toolbar";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Toolbar", () => {
  test("when there is no todo, buttons should not show up", () => {
    render(<Toolbar hasTodo={false} dispatch={jest.fn()} activeTodos={0} />);
    expect(screen.queryByTestId("btn-delete-all")).not.toBeInTheDocument();
    expect(screen.queryByTestId("toggle-all-wrapper")).toHaveStyle("opacity:0");
  });
  test("when there is any todo, buttons should show up", () => {
    render(<Toolbar hasTodo={true} dispatch={jest.fn()} activeTodos={2} />);
    expect(screen.getByTestId("btn-delete-all")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-all-wrapper")).toHaveStyle("opacity:1");
  });
  test("when there is any todo, and ALL Todos are completed => toggle input should be checked by default", () => {
    render(<Toolbar hasTodo={true} dispatch={jest.fn()} activeTodos={0} />);
    expect(screen.getByTestId("input-toggle-all")).toBeChecked();
  });
  test("when there is any todo, not all todos are completed => toggle input should be unchecked by default", () => {
    render(<Toolbar hasTodo={true} dispatch={jest.fn()} activeTodos={1} />);
    expect(screen.getByTestId("input-toggle-all")).not.toBeChecked();
  });
  test("after click toggle-all, the dispatch function should be called", () => {
    const mockDispatch = jest.fn();
    render(<Toolbar hasTodo={true} dispatch={mockDispatch} activeTodos={2} />);
    const toggleAllInput = screen.getByTestId("input-toggle-all");
    userEvent.click(toggleAllInput);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
  test("when click delete-all, the dispatch function should be called", () => {
    const mockDispatch = jest.fn();
    render(<Toolbar hasTodo={true} dispatch={mockDispatch} activeTodos={2} />);
    const deleteAllButton = screen.getByTestId("btn-delete-all");
    userEvent.click(deleteAllButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
