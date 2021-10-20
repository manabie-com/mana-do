import React from "react";
import { cleanup, render } from "@testing-library/react";
import TodoToolbar from "..";
import userEvent from "@testing-library/user-event";
import { TodoContext, TodoContextType } from "../../../../hooks/useTodo";
import { AppState } from "../../../../store/reducer";
import { TodoStatus } from "../../../../models/todo";
import { Constants } from "../../../../constants";
import { deleteAllTodos, toggleAllTodos } from "../../../../store/actions";

const getMockTodosData = (
  data = [
    {
      id: "todo1",
      user_id: "user_id1",
      content: "content1",
      status: TodoStatus.ACTIVE,
      created_date: new Date().toISOString(),
    },
    {
      id: "todo2",
      user_id: "user_id2",
      content: "content2",
      status: TodoStatus.ACTIVE,
      created_date: new Date().toISOString(),
    },
  ]
) => data;

const contextValue: TodoContextType = {
  state: {
    todos: getMockTodosData(),
    showing: Constants.ALL,
  } as AppState,
  dispatch: jest.fn(),
};

describe("TodoToolbar", () => {
  afterEach(cleanup);

  it("test toogle all todo", () => {
    const { container } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoToolbar />
      </TodoContext.Provider>
    );

    const checkboxEl = container.querySelector(
      ".todo-toolbar__checkbox"
    ) as HTMLInputElement;

    expect(checkboxEl).not.toBeNull();

    expect(checkboxEl.disabled).toBe(false);

    expect(checkboxEl.checked).toBe(false);

    userEvent.click(checkboxEl);

    expect(contextValue.dispatch).toBeCalledWith(toggleAllTodos(true));
  });

  it("test clear all todo", () => {
    window.confirm = jest.fn(() => true);

    const { getByTestId } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoToolbar />
      </TodoContext.Provider>
    );

    const clearBtnEl = getByTestId("clear") as HTMLButtonElement;

    userEvent.click(clearBtnEl);

    expect(window.confirm).toBeCalled();

    expect(contextValue.dispatch).toBeCalledWith(deleteAllTodos());
  });
});
