import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { getElementByTestId } from "utils/testUtils";
import TodoTab, { ITodoTabProps } from "../TodoTab";

const onClickSelectStatusAction = jest.fn();
const onDeleteAllTodoAction = jest.fn();

const renderComponent = ({
  selectedStatus,
  onClickSelectStatus,
  onDeleteAllTodo,
  ...props
}: ITodoTabProps): RenderResult => {
  return render(
    <TodoTab
      selectedStatus={selectedStatus}
      onClickSelectStatus={onClickSelectStatus}
      onDeleteAllTodo={onDeleteAllTodo}
      {...props}
    />
  );
};

describe("<TodoItem /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent({
      selectedStatus: "ALL",
      onClickSelectStatus: onClickSelectStatusAction,
      onDeleteAllTodo: onDeleteAllTodoAction,
    });
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render correcly", () => {
    renderComponent({
      selectedStatus: "ALL",
      onClickSelectStatus: onClickSelectStatusAction,
      onDeleteAllTodo: onDeleteAllTodoAction,
    });
    const element = getElementByTestId("todo-tab");
    const buttonElements = element.querySelectorAll("button.btn-todo");

    const clearAllButtonElement = screen.getByRole("button", {
      name: /Clear all/i,
    });

    expect(clearAllButtonElement).toBeInTheDocument();
    expect(clearAllButtonElement).toHaveClass("btn-todo--danger");

    expect(element).toBeInTheDocument();
    expect(buttonElements).toHaveLength(3);
  });

  it("should render button with selected class", () => {
    renderComponent({
      selectedStatus: "ALL",
      onClickSelectStatus: onClickSelectStatusAction,
      onDeleteAllTodo: onDeleteAllTodoAction,
    });
    const buttonElement = screen.getByRole("button", { name: "ALL" });
    expect(buttonElement).toHaveClass("btn-todo--selected");
  });
});

describe("<TodoItem /> interacting", () => {
  it("should handle onClick when clicked", () => {
    renderComponent({
      selectedStatus: "ALL",
      onClickSelectStatus: onClickSelectStatusAction,
      onDeleteAllTodo: onDeleteAllTodoAction,
    });
    const buttonElement = screen.getByRole("button", { name: /ACTIVE/i });
    userEvent.click(buttonElement);
    expect(onClickSelectStatusAction).toHaveBeenCalled();
  });

  it("should handle onClick when clear all button was clicked", () => {
    renderComponent({
      selectedStatus: "ALL",
      onClickSelectStatus: onClickSelectStatusAction,
      onDeleteAllTodo: onDeleteAllTodoAction,
    });
    const clearAllButtonElement = screen.getByRole("button", {
      name: /Clear all/i,
    });
    userEvent.click(clearAllButtonElement);
    expect(onDeleteAllTodoAction).toHaveBeenCalled();
  });
});
