import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FilterButtons from "../FilterButtons";
import { EnhanceTodoStatus } from "component/Todo";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Filtering todos based on status", () => {
  let filterAll: any,
    filterActive: any,
    filterCompleted: any,
    setShowing: () => void;

  beforeEach(() => {
    const showing: EnhanceTodoStatus = "ALL";
    setShowing = jest.fn();
    render(<FilterButtons showing={showing} setShowing={setShowing} />);
    filterAll = screen.getByTestId("btn-filter-ALL");
    filterActive = screen.getByTestId("btn-filter-ACTIVE");
    filterCompleted = screen.getByTestId("btn-filter-COMPLETED");
  });

  test("buttons should exist", () => {
    expect(filterAll).toBeInTheDocument();
    expect(filterActive).toBeInTheDocument();
    expect(filterCompleted).toBeInTheDocument();
  });
  test("after click, setShowing should be called", () => {
    userEvent.click(filterCompleted);
    expect(setShowing).toHaveBeenCalledTimes(1);
  });
});
