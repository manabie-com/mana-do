import React from "react";
import { cleanup, render } from "@testing-library/react";
import { TodoContext, TodoContextType } from "../../../../hooks/useTodo";
import { AppState } from "../../../../store/reducer";
import { Constants } from "../../../../constants";
import { TodoStatus } from "../../../../models/todo";
import TodoList from "..";

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

describe("TodoList", () => {
  afterEach(cleanup);

  it("test render todo list", () => {
    const { getAllByRole } = render(
      <TodoContext.Provider value={contextValue}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(getAllByRole("checkbox")).toHaveLength(2);
  });
});
