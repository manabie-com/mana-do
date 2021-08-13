import { render, screen } from "@testing-library/react";
import { ItemTodo } from "../ItemTodo";
import userEvent from "@testing-library/user-event";

describe("ItemTodo", () => {
  it("Should render content", () => {
    render(<ItemTodo toDoContent="TEST" />);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  it("Should render incluce line-through", () => {
    const onChangeChecbox = jest.fn();

    render(
      <ItemTodo toDoContent="TEST" checked onChangeChecbox={onChangeChecbox} />
    );
    expect(screen.getByText("TEST")).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  it("Can edit todo", () => {
    render(<ItemTodo toDoContent="TEST" editing />);
    expect(document.querySelector(".item-todo__input")).toBeInTheDocument();
  });

  it("Should onDoubleClick", () => {
    const onDoubleClick = jest.fn();
    render(<ItemTodo toDoContent="TEST" onDoubleClick={onDoubleClick} />);
    userEvent.dblClick(screen.getByTestId("item-todo"));
    expect(onDoubleClick).toBeCalledTimes(1);
  });

  it("Should onDoubleClick", () => {
    const onDoubleClick = jest.fn();
    render(<ItemTodo toDoContent="TEST" onDoubleClick={onDoubleClick} />);
    userEvent.dblClick(screen.getByTestId("item-todo"));
    expect(onDoubleClick).toBeCalledTimes(1);
  });

  it("Should void detele", () => {
    const onDelete = jest.fn();
    render(<ItemTodo toDoContent="TEST" onDelete={onDelete} />);
    userEvent.click(screen.getByTestId("item-todo-delete"));
    expect(onDelete).toBeCalledTimes(1);
  });

  it("Should void detele", () => {
    const onChangeChecbox = jest.fn();
    render(<ItemTodo toDoContent="TEST" onChangeChecbox={onChangeChecbox} />);
    userEvent.click(screen.getByTestId("item-todo-checked"));
    expect(onChangeChecbox).toBeCalledTimes(1);
  });
});
