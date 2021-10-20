import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import TodoItem from "../index";
import { TodoStatus } from "../../../../models/todo";
import { isTodoCompleted } from "../../../../utils";
import userEvent from "@testing-library/user-event";
import { TodoContext, TodoContextType } from "../../../../hooks/useTodo";
import { AppState } from "../../../../store/reducer";
import { deleteTodo, updateTodoContent } from "../../../../store/actions";
import { Constants } from "../../../../constants";

const getMockTodo = (
  data = {
    id: "todo",
    user_id: "user_id",
    content: "content",
    status: TodoStatus.ACTIVE,
    created_date: new Date().toISOString(),
  }
) => data;

const contextValue: TodoContextType = {
  state: {
    todos: [getMockTodo()],
    showing: Constants.ALL,
  } as AppState,
  dispatch: jest.fn(),
};

describe("TodoItem", () => {
  afterEach(cleanup);

  it("test checkbox of todo item", () => {
    const mockTodo = getMockTodo();

    const { getByTestId } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );

    const checkboxEl = getByTestId("checkbox") as HTMLInputElement;

    const checked = isTodoCompleted(mockTodo);

    expect(checkboxEl.checked).toBe(checked);
  });

  it("test update item", () => {
    const mockTodo = getMockTodo();

    const { container } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );

    const labelEl = container.querySelector("label") as HTMLLabelElement;

    let inputEl: HTMLInputElement;
    let spanEl: HTMLSpanElement;

    userEvent.dblClick(labelEl);

    inputEl = container.querySelector(".todo-item__edit") as HTMLInputElement;
    spanEl = container.querySelector("span") as HTMLSpanElement;

    expect(inputEl).not.toBeNull();

    expect(spanEl).toBeNull();

    fireEvent.change(inputEl, {
      target: {
        value: "Content",
      },
    });
    fireEvent.keyDown(inputEl, {
      key: "Enter",
      code: 13,
      charCode: 13,
    });

    expect(contextValue.dispatch).toBeCalledWith(
      updateTodoContent(mockTodo.id, "Content")
    );

    inputEl = container.querySelector(".todo-item__edit") as HTMLInputElement;
    spanEl = container.querySelector("span") as HTMLSpanElement;

    expect(inputEl).toBeNull();

    expect(spanEl).not.toBeNull();
  });

  it("test delete item with confirm", () => {
    const mockTodo = getMockTodo();

    window.confirm = jest.fn(() => true);

    const { getByTestId } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );

    const deleteBtnEl = getByTestId("delete") as HTMLButtonElement;

    userEvent.click(deleteBtnEl);

    expect(window.confirm).toBeCalled();

    expect(contextValue.dispatch).toBeCalledWith(deleteTodo(mockTodo.id));
  });
});
