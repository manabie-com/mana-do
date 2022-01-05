import React from "react";
import { Footer } from "components";
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoStatus } from "models";
import { Props } from "components/Footer/Footer";

type EnhanceTodoStatus = TodoStatus | "ALL";

const mockShowing: EnhanceTodoStatus = "ALL";
const mockOnDeleteAllTodo = jest.fn();
const mockOnSetShowing = jest.fn();
const props: Props = {
  todoAmount: 7,
  activeTodos: 1,
  showing: mockShowing,
  onSetShowing: mockOnSetShowing,
  onDeleteAllTodo: mockOnDeleteAllTodo,
};
describe("TodoToolbar component", () => {
  describe("initialized with activeTodos is 0,1 and 7", () => {
    it("should display todos when number of active todos is one", () => {
      render(<Footer {...props} />);
      expect(screen.getByText("1 todo left")).toBeInTheDocument();
    });
    it("should display todos when number of active todos is greater than one", () => {
      const newProps = { ...props, activeTodos: 1 };
      render(<Footer {...newProps} />);
      expect(screen.getByText("7 todos left")).toBeInTheDocument();
    });
    it("should display todos when number of active todos is zero", () => {
      const newProps = { ...props, activeTodos: 0 };
      render(<Footer {...newProps} />);
      expect(screen.getByText("0 todo left")).toBeInTheDocument();
    });
  });
  describe("initialized with different todoAmount prop", () => {
    it("should checkbox be displayed when todoAmount is greater than 0", () => {
      render(<Footer {...props} />);
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
    it("should checkbox not be displayed when todoAmount is equal 0", () => {
      const newProps = { ...props, todoAmount: 0 };
      render(<Footer {...newProps} />);
      expect(screen.queryByRole("checkbox")).toBeNull();
    });
  });
  describe("initialized with different showing prop", () => {
    it("should button all have class active in first render", () => {
      render(<Footer {...props} />);
      const btnElement = screen.getByRole("link", { name: "All" });
      expect(btnElement).toHaveClass("selected");
    });
    it("should button active have active class when showing is active", () => {
      const newProps = { ...props, showing: TodoStatus.ACTIVE };
      render(<Footer {...newProps} />);
      const btnElement = screen.getByRole("link", { name: "Active" });
      expect(btnElement).toHaveClass("selected");
    });
    it("should button complete have active class when showing is completed", () => {
      const newProps = { ...props, showing: TodoStatus.COMPLETED };
      render(<Footer {...newProps} />);
      const btnElement = screen.getByRole("link", { name: "Completed" });
      expect(btnElement).toHaveClass("selected");
    });
  });
  describe("Should action buttons tab be triggered", () => {
    beforeEach(() => {
      render(<Footer {...props} />);
    });
    it("trigger show active todos event when active button is clicked", () => {
      const btnElement = screen.getByRole("link", { name: "Active" });
      fireEvent.click(btnElement);
      expect(mockOnSetShowing).toHaveBeenCalledTimes(1);
      expect(mockOnSetShowing).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    });
    it("trigger show active todos event when completed button is clicked", () => {
      const btnElement = screen.getByRole("link", { name: "Completed" });
      fireEvent.click(btnElement);
      expect(mockOnSetShowing).toHaveBeenCalledTimes(1);
      expect(mockOnSetShowing).toHaveBeenCalledWith(TodoStatus.COMPLETED);
    });
    it("trigger delete all todos event when clear all todos button is clicked", () => {
      const btnElement = screen.getByRole("button", {
        name: "Clear all todos",
      });
      fireEvent.click(btnElement);
      expect(mockOnDeleteAllTodo).toHaveBeenCalledTimes(1);
    });
  });
});
