import { fireEvent, render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoStatus } from "models";
import React from "react";
import { deleteTodo, updateTodoStatus } from "store/action-handlers";
import { getElementByTestId } from "utils/testUtils";
import TodoItem, { ITodoItemProps } from "../TodoItem";

const onDispatch = jest.fn();

const props = {
  dispatch: onDispatch,
  id: "id 1",
  user_id: "user_id 1",
  content: "content testing 1",
  status: TodoStatus.COMPLETED,
  created_date: "2022-05-08T04:44:10.054Z",
};

const renderComponent = ({ ...props }: ITodoItemProps): RenderResult => {
  return render(<TodoItem {...props} />);
};

describe("<TodoItem /> rendering", () => {
  it("should match snapshot", () => {
    const wrapper = renderComponent(props);
    expect(wrapper.container).toMatchSnapshot();
  });

  it("should render correcly", () => {
    renderComponent(props);
    const element = getElementByTestId("todo-item");
    expect(element).toBeInTheDocument();
  });

  it("should render a input with the default class", () => {
    renderComponent(props);
    const element = getElementByTestId("todo-item");
    expect(element).toHaveClass("todo-item");
  });
});

describe("<TodoItem /> interacting", () => {
  it("should handle onClick to trigger deleteTodo", () => {
    renderComponent(props);

    const element = getElementByTestId("todo-item-delete");
    userEvent.click(element);
    expect(props.dispatch).toHaveBeenCalledWith(deleteTodo(props.id));
  });

  it("should handle onClick checkbox in order to updateTodoStatus", () => {
    renderComponent(props);

    const checkboxElement = getElementByTestId("checkbox") as HTMLInputElement;
    fireEvent.click(checkboxElement, { target: { checked: true } });
    expect(props.dispatch).toHaveBeenCalledWith(
      updateTodoStatus(props.id, TodoStatus.ACTIVE)
    );
  });

  it("should handle onDoubleClick in order to make input becomes editable", () => {
    renderComponent(props);

    const element = getElementByTestId("label-content");
    const deleteElement = getElementByTestId("todo-item-delete");
    const checkboxElement = getElementByTestId("checkbox");
    const labelElement = getElementByTestId("label-content");

    fireEvent.doubleClick(element);

    const inputElement = getElementByTestId("input") as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(deleteElement).not.toBeInTheDocument();
    expect(labelElement).not.toBeInTheDocument();
    expect(checkboxElement).not.toBeInTheDocument();
    expect(inputElement.value).toBe(props.content);
    expect(inputElement).toHaveClass("todo-item__input--editing");
  });
});
